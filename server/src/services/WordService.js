// Возможно нужны будут инклуды для вытягивания побочных данных.
const { Word } = require('../../db/models');

class WordService {
    static getAllWords() {
    return Word.findAll({ order: [['updatedAt', 'DESC']] });
  }

  static addWord(data) {
    return Word.create(data);
  }

  static getOneWord(id) {
    return Word.findByPk(id);
  }

  static async editWord(id) {
    const oneWord= await WordService.getOneWord(id);
    if (oneWord) {
    //   oneWord.isSale = false;?? Как-будто не надо
      await oneWord.save();
    }
    return oneWord;
  }

  static async deleteWord(id, authorId) {
    const oneWord = await CraftService.getOneWord(id);
    if (oneWord.authorId !== authorId) throw new Error('Forbidden');
    if (oneWord) {
      await oneWord.destroy();
    }
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

module.exports = WordService