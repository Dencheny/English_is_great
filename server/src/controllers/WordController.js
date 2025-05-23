const WordService = require('../services/WordService');
const formatResponse = require('../utils/formatResponse');
const WordValidator = require('../utils/wordValidator');

class WordController {
  // все слова c бд
  static async getAllWordsFromDb(req, res) {
    try {
      const { user } = res.locals; // из middleware verifyAccessToken
      if (!user) {
        return res
          .status(401)
          .json(formatResponse(401, 'Unauthorized: User not authenticated'));
      }
      const allWords = await WordService.getAllWords(); /// изменить
      // console.log(allWords)
      if (allWords.length === 0) {
        return res.status(200).json(formatResponse(200, 'No Word found', []));
      }
      return res.status(200).json(formatResponse(200, 'Success', allWords));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }
  // все созданные юзером слова
  static async getAllWordsBuUser(req, res) {
    try {
      const { user } = res.locals; // из middleware verifyAccessToken
      if (!user) {
        return res
          .status(401)
          .json(formatResponse(401, 'Unauthorized: User not authenticated'));
      }
      const allWords = await WordService.getAllWordsByUser(user.id); /// изменить
      // console.log(allWords)
      if (allWords.length === 0) {
        return res.status(200).json(formatResponse(200, 'No Word found', []));
      }
      return res.status(200).json(formatResponse(200, 'Success', allWords));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  // все не изученные слова юзера  - конкретной темы
  static async getUnlearnedWordsByOneTheme(req, res) {
    try {
      const { themeId } = req.params;
      const userId = res.locals.user.id;
      // const userId = 1;
      const words = await WordService.getUnlearnedWordsByTheme(themeId, userId);
      // console.log('4:words', words)
      const formattedWords = words.map((word) => ({
        id: word.id,
        english: word.english,
        russian: word.russian,
        themeId: word.Theme.id,
      }));
      //  console.log('5:formattedWords', formattedWords)
      res.json(formatResponse(200, 'Success', formattedWords));
    } catch (error) {
      console.error(error);
      res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  // создание нового слова или ошибка Word already exists
  static async createOrFindWord(req, res) {
    try {
      const { english, russian, themeId } = req.body;
      console.log(req.body);
      // const authorId = null // для проверки в постман
      const authorId = res.locals.user.id;
      // Предполагаем, что userId берётся из middleware авторизации
      // берется не из req.body, а из рес локалс для безопасности, потому что юзер может
      // прокинуть совершенно другой authorId , например другого пользователя.
      console.log({ english, russian, themeId, authorId });
      if (!authorId) {
        return res.status(404).json(formatResponse(404, 'AuthorId undefined'));
      }

      const word = await WordService.addWord({
        english,
        russian,
        themeId,
        authorId,
      });
      res.status(201).json(formatResponse(201, 'Success', word));
    } catch (error) {
      if (error.message === 'Word already exists') {
        res.status(400).json(formatResponse(400, 'Word already exists'));
      } else {
        console.error(error);
        res.status(500).json(formatResponse(500, 'Internal Server Error'));
      }
    }
  }

  // редактирование
  static async updateWord(req, res) {
    try {
      // const { id } = res.locals;

      const { id } = req.params;
      const authorId = res.locals.user.id;

      const { english, russian, themeId } = req.body;
      console.log('New data:', english, russian, themeId);
      const { isValid, error } = WordValidator.validate({
        english,
        russian,
        themeId,
        authorId,
      });
      if (!isValid) {
        return res
          .status(400)
          .json(formatResponse(400, 'Validation failed', null, error));
      }
      const updatedWord = await WordService.editWord(
        { english, russian, themeId, authorId },
        id
      );
      console.log('Updated data:', updatedWord);
      if (!updatedWord) {
        return res.status(400).json(formatResponse(400, 'Word not found'));
      }
      return res.status(200).json(formatResponse(200, 'Success', updatedWord));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }
  // удаление

  static async deleteOneWord(req, res) {
    try {
      // const { id } = req.params; для логики с параметризированным запросом

      const { id } = req.body; // актуальный вариант!
      console.log('проверкаэ', req.body, id, res.locals.user.id);
      const authorId = res.locals.user.id; // тоже для доп защиты, прописывал ранеее

      // const authorId = 1; роу запрос

      const deletedWord = await WordService.deleteWord(id, authorId);
      if (!deletedWord) {
        return res.status(404).json(formatResponse(404, 'Word not found'));
      }

      return res.status(204).json(formatResponse(204, 'Success'));
    } catch (err) {
      console.error(err);
      if (err.message === 'Word not found') {
        return res.status(404).json(formatResponse(404, 'Word not found'));
      }
      if (err.message === 'Forbidden') {
        return res
          .status(403)
          .json(
            formatResponse(
              403,
              'Forbidden: You are not allowed to delete this word'
            )
          );
      }
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }
}

module.exports = WordController;
