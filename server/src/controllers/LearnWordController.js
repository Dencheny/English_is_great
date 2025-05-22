const LearnWordService = require('../services/LearnWordService');
const formatResponse = require('../utils/formatResponse');
const LearnWordValidator = require('../utils/learnWordValidator');

class LearnWordController {
  // все изученные слова юзера - конкретной темы
  static async getLearnWordsByTheme(req, res) {
    try {
      const { user } = res.locals; // из middleware verifyAccessToken
      if (!user) {
        return res
          .status(401)
          .json(formatResponse(401, 'Unauthorized: User not authenticated'));
      }
      const { themeId } = req.body;

      const userId = 2;
      // console.log('req.body', req.body)
      // console.log('userId, themeId',userId, themeId)
      const learnWords = await LearnWordService.markAllLearnedByTheme(
        userId,
        themeId
      );
      if (learnWords.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, 'No learnWord found', []));
      }
      return res.status(200).json(formatResponse(200, 'Success', learnWords));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  // запись в бд изученного слова
  static async createLearnWord(req, res) {
    // const { themeId } = req.params;
    // console.log('themeId', typeof themeId, themeId)
    const { id , themeId} = req.body;
    const wordId = id;

    const userId = res.locals.user.id;
    // const userId = 1
    // console.log('userId', typeof userId)
    const { user } = res.locals; // из middleware verifyAccessToken
    if (!user) {
      return res
        .status(401)
        .json(formatResponse(401, 'Unauthorized: User not authenticated'));
    }
    const { isValid, error } = LearnWordValidator.validate({
      wordId,
      userId,
      themeId,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation failed', null, error));
    }
    try {
      const { record, created } = await LearnWordService.createLearnWordByDb({
        wordId,
        userId,
        themeId,
      });
      
      if (!created) {
        return res
          .status(200)
          .json(formatResponse(200, 'already exist learnWord', record));
      }
      return res.status(201).json(formatResponse(201, 'Success', record));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  // все изученные слова юзера
  static async getLearnWords(req, res) {
    try {
      const { user } = res.locals; // из middleware verifyAccessToken
      if (!user) {
        return res
          .status(401)
          .json(formatResponse(401, 'Unauthorized: User not authenticated'));
      }
      const { userId } = req.body;
      const learnWords = await LearnWordService.markAllLearned(userId); /// изменить
      if (learnWords.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, 'No learnWord found', []));
      }
      return res.status(200).json(formatResponse(200, 'Success', learnWords));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }
}

module.exports = LearnWordController;
