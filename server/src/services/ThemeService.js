const { Theme, Word, LearnWord } = require('../../db/models');

class ThemeService {
  static getAllThemes() {
    return Theme.findAll({ order: [['updatedAt', 'DESC']] });
  }

  static getOneTheme(id) {
    return Theme.findByPk(id);
  }
  // метод на вытягивание всех слов
  static async getAllThemesForProgressBar(userId) {
    return Theme.findAll({
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: Word,
          attributes: ['id'], // Для подсчёта общего количества слов
        },
        {
          model: LearnWord,
          where: { userId },
          required: false, // Чтобы вернуть темы, даже если ничего не изучено
          attributes: ['id'], // Для подсчёта изученных слов
        },
      ],
    });
  }
}

module.exports = ThemeService;

// Расширенный сервис с использованием псевдонимов

// const { Theme, Word, LearnWord } = require('../../db/models');

// class ThemeService {

// Этот метод поможет вытянуть сразу прогресс,
// учитывая отношение изученных слов ко всем словам

//   static async getAllThemes(userId) {
//     const themes = await Theme.findAll({
//       order: [['updatedAt', 'DESC']],
//       include: [
//         {
//           model: Word,
//           as: 'words', // Укажи alias, если он есть в модели
//           attributes: ['id'], // Нам нужно только количество карточек
//         },
//         {
//           model: LearnWord,
//           as: 'learnedWords', // Укажи alias, если есть
//           where: { userId }, // Только для текущего пользователя
//           required: false, // Чтобы темы без прогресса тоже вернулись
//           attributes: ['id'],
//         },
//       ],
//     });
//     return themes.map(theme => {
//       const totalWords = theme.words.length;
//       const learnedWords = theme.learnedWords.length;
//       return {
//         ...theme.toJSON(),
//         totalWords,
//         learnedWords,
//         progress: totalWords ? (learnedWords / totalWords) * 100 : 0,
//       };
//     });
//   }
