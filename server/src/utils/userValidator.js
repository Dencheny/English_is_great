class UserValidator {
  static validate(craft) {
    const { name, email, password } = craft;
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return {
        isValid: false,
        error: 'Name must be filled string',
      };
    }
    if (!email || typeof email !== 'string' || email.trim() === '') {
      return {
        isValid: false,
        error: 'Email must be filled string',
      };
    }
    if (!password || typeof password !== 'string' || password.trim() === '') {
      return {
        isValid: false,
        error: 'Password must be filled string',
      };
    }
    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = UserValidator;
