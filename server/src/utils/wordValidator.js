class WordValidator {
  static validate(word) {
    const { english, russian, userId, authorId } = word;
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
    if (!userId || typeof userId !== 'number' || userId.trim() === '') {
      return {
        isValid: false,
        error: 'UserId must be filled number',
      };
    }
     if (!authorId || typeof authorId !== 'number' || authorId.trim() === '') {
      return {
        isValid: false,
        error: 'UserId must be filled number',
      };
    }
    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = WordValidator;
