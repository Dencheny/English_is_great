class CraftValidator {
  static validate(craft) {
    const { english, russian, userId } = craft;
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
    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = CraftValidator;
