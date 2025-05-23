const isValidId = require('./isValidId')
class WordValidator {
  static validate(word) {
    const { english, russian, themeId, authorId } = word;
 // if (!english || typeof english !== 'string' || english.trim() === '') {
    // Проверка на наличие инглиша!
    if (!english || typeof english !== 'string' || !/^[a-zA-Z\s'-]+$/.test(english)) {
      return {
        isValid: false,
        error: 'Введите слово на латинице',
      };
    }
    // if (!russian || typeof russian !== 'string' || russian.trim() === '') {
    // проверка на рашн
    if (!russian || typeof russian !== 'string' || !/^[а-яА-ЯёЁ\s-]+$/u.test(russian)) {
      return {
        isValid: false,
        error: 'Ведите слово на кириллице',
      };
    }
    // if (!userId || typeof (+userId) !== 'number' || userId.trim() === '')
      if (isValidId(themeId)) {
        console.log('themeId', typeof themeId)
      return {
        isValid: false,
        error: 'UserId must be filled number',
      };
    }
    //  if (!authorId || typeof +authorId !== 'number' || authorId.trim() === '') 
    if (isValidId(authorId)) {
      console.log('authorId:', authorId)
      return {
        isValid: false,
        error: 'authorId must be filled number',
      };
    }
    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = WordValidator;
