class LearnWordValidator {
  static validate(learnWord) {
    const { wordId, userId, themeId } = learnWord;
    if (!wordId || typeof wordId !== 'number' || wordId.trim() === '') {
      return {
        isValid: false,
        error: 'WordId must be filled number',
      };
    }
    if (!userId || typeof userId !== 'number' || userId.trim() === '') {
      return {
        isValid: false,
        error: 'UserId must be filled number',
      };
    }
    if (!themeId || typeof themeId !== 'number' || themeId.trim() === '') {
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
