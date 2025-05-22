const { LearnWord } = require('../../db/models');
// const { Word, Theme } = require('../../db/models'); для прогрес бара

class LearnWordService {
  // получить все изученные слова
  static async markAllLearned(userId) {
    const learnWordArr = await LearnWord.findAll({
      where: { userId },
    });
    return learnWordArr;
  }

  // получить все изученные юзером слова конкретной темы для прогресса 
  static async markAllLearnedByTheme(userId, themeId) {
    const learnWordArr = await LearnWord.findAll({
      where: { userId, themeId },
    });
    return learnWordArr;
  }

  // Пометить карточку как изученную - создаем запись в таблице об изученном слове
  static async createLearnWordByDb({userId, wordId, themeId}) {
    console.log('services data',userId, wordId, themeId)
    const [record, created] = await LearnWord.findOrCreate({
      where: { userId, wordId, themeId },
    });
    
    return { record, created };
  }

  // // Удалить карточку из изученных (если нужно отменить)
  // static async unmarkAsLearned(userId, wordId) {
  //   const record = await LearnWord.findOne({ where: { userId, wordId } });
  //   if (!record) throw new Error('Record not found');
  //   await record.destroy();
  //   return record;
  // }

  // Проверить, изучена ли конкретная карточка
  // static async isWordLearned(userId, wordId) {
  //   const record = await LearnWord.findOne({ where: { userId, wordId } });
  //   return !!record;
  // }

  // Получить прогресс пользователя по всем темам
  //   static async getProgress(userId) {
  //     const themes = await Theme.findAll({
  //       include: [
  //         {
  //           model: Word,
  //           as: 'words',
  //           attributes: ['id'],
  //         },
  //         {
  //           model: LearnWord,
  //           as: 'learnedWords',
  //           where: { userId },
  //           required: false,
  //           attributes: ['id'],
  //         },
  //       ],
  //     });

  //     return themes.map(theme => {
  //       const totalWords = theme.words.length;
  //       const learnedWords = theme.learnedWords.length;
  //       return {
  //         theme: theme.name,
  //         totalWords,
  //         learnedWords,
  //         progress: totalWords ? (learnedWords / totalWords) * 100 : 0,
  //       };
  //     });
  //   }
}

module.exports = LearnWordService;
