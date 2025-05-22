const isValidId = require('./isValidId')
class WordValidator {
  static validate(word) {
    const { english, russian, themeId, authorId } = word;
    if (!english || typeof english !== 'string' || english.trim() === '') {
      return {
        isValid: false,
        error: 'English must be filled string',
      };
    }
    if (!russian || typeof russian !== 'string' || russian.trim() === '') {
      return {
        isValid: false,
        error: 'Russian must be filled string',
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
