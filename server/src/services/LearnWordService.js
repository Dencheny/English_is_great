const { LearnWord, Word, Theme } = require('../../db/models');

class LearnWordService {
  // Пометить карточку как изученную
  static async markAsLearned(userId, wordId) {
    const [record, created] = await LearnWord.findOrCreate({
      where: { userId, wordId },
    });
    return { record, created };
  }

  // Удалить карточку из изученных (если нужно отменить)
  static async unmarkAsLearned(userId, wordId) {
    const record = await LearnWord.findOne({ where: { userId, wordId } });
    if (!record) throw new Error('Record not found');
    await record.destroy();
    return record;
  }

  // Получить прогресс пользователя по всем темам
  static async getProgress(userId) {
    const themes = await Theme.findAll({
      include: [
        {
          model: Word,
          as: 'words',
          attributes: ['id'],
        },
        {
          model: LearnWord,
          as: 'learnedWords',
          where: { userId },
          required: false,
          attributes: ['id'],
        },
      ],
    });

    return themes.map(theme => {
      const totalWords = theme.words.length;
      const learnedWords = theme.learnedWords.length;
      return {
        theme: theme.name,
        totalWords,
        learnedWords,
        progress: totalWords ? (learnedWords / totalWords) * 100 : 0,
      };
    });
  }

  // Проверить, изучена ли конкретная карточка
  static async isWordLearned(userId, wordId) {
    const record = await LearnWord.findOne({ where: { userId, wordId } });
    return !!record;
  }
}

module.exports = LearnWordService;