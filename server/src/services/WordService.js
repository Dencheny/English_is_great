// Возможно нужны будут инклуды для вытягивания побочных данных.
const { Theme, Word, LearnWord } = require('../../db/models');
const { Sequelize } = require('sequelize');

class WordService {
  static async getAllWords() {
    const wordsArr = await Word.findAll({ order: [['updatedAt', 'DESC']] });
    return wordsArr;
  }

  // все созданные юзером слова
  static async getAllWordsByUser(id) {
    const wordsArr = await Word.findAll({ where: { authorId: id } });
    return wordsArr;
  }

  // метод на вытягивание всех неизученных слов по выбранной теме, для фронта
  static async getUnlearnedWordsByTheme(themeId, userId) {
    return Word.findAll({
      where: {
        themeId,
        '$LearnWords.id$': { [Sequelize.Op.is]: null }, // Только неизученные слова
      },
      include: [
        {
          model: Theme, // Включаем тему для получения её данных (например, themeName)
        },
        {
          model: LearnWord,
          where: { userId },
          required: false, // Левый join, чтобы включить слова без записей в LearnWord
        },
      ],
      order: [['updatedAt', 'DESC']],
    });
  }

  static async addWord(data) {
    const { english, russian, themeId, authorId } = data;

    // Проверяем, существует ли слово с такими english, russian и themeId
    const [word, created] = await Word.findOrCreate({
      where: { english, russian, themeId },
      defaults: { authorId }, // Значения, которые будут использованы при создании
    });

    // Если слово уже существует, выбрасываем ошибку
    if (!created) {
      throw new Error('Word already exists');
    }

    return word;
  }

  static async addWords(data) {
    return await Word.bulkCreate(data, { validate: true });
  }

  static getOneWord(id) {
    return Word.findByPk(id);
  }

  // редакт
  static async editWord(data, id) {
    const oneWord = await WordService.getOneWord(id);
    if (!oneWord) throw new Error('Word not found');
    if (oneWord) {
      await oneWord.update(data);
    }
    return oneWord;
  }

  static async deleteWord(id, authorId) {
    const oneWord = await WordService.getOneWord(id);
    if (!oneWord) throw new Error('Word not found');
    if (oneWord.authorId !== authorId) throw new Error('Forbidden');

    await oneWord.destroy();

    return oneWord;
  }

  // Если будем реализовывать поиск
  //   static async search(query) {
  //     const crafts = await Craft.findAll({
  //       where: {
  //         title: {
  //           [Op.iLike]: `%${query}%`,
  //         },
  //       },
  //     });
  //     return crafts;
  //   }
}

module.exports = WordService;
