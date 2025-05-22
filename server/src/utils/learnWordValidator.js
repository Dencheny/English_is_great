const isValidId = require("./isValidId");

class LearnWordValidator {
  static validate(learnWord) {
    const { wordId, userId, themeId } = learnWord;
    if (isValidId(wordId)) {
      return {
        isValid: false,
        error: 'WordId must be filled number',
      };
    }
    if (isValidId(userId)) {
      return {
        isValid: false,
        error: 'UserId must be filled number',
      };
    }
    if (isValidId(themeId)) {
      return {
        isValid: false,
        error: 'ThemeId must be filled number',
      };
    }
    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = LearnWordValidator;
