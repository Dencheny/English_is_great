// Возможно нужны будут инклуды для вытягивания побочных данных.
const { Word } = require('../../db/models');

class WordService {
    static getAllWords() {
    return Word.findAll({ order: [['updatedAt', 'DESC']] });
  }

  static addWord(data) {
    return Word.create(data);
  }

// Включение темы через псевдонимы

/*

static getOneWord(id) {
  return Word.findByPk(id, {
    include: [{ model: Theme, as: 'theme' }],
  });
}

*/


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
  // Расширенный метод edit с псевдонимами
  /*
static async editWord(id, data, authorId) {
  const word = await WordService.getOneWord(id);
  if (!word) throw new Error('Word not found');
  if (word.authorId !== authorId) throw new Error('Forbidden');
  Object.assign(word, data); // Обновляем поля (например, english, russian, themeId)
  await word.save();
  return word;
}


static async getWordsByTheme(themeId, userId) {
  return Word.findAll({
    where: { themeId },
    include: [
      {
        model: LearnWord,
        as: 'learned', // Укажи alias, если есть
        where: { userId },
        required: false,
      },
    ],
  });
}
*/


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

module.exports = WordService
