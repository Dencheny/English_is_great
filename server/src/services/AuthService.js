const { User } = require("../../db/models");
class AuthService {
  static async register({ email, name, password }) {
    const [user, created] = await User.findOrCreate({
      where: { email }, // jane@jane --- created: true, bob@bob --- created:false
      defaults: { name, password },
    });

    return { user, created };
  }

  static async getUserByEmail({ email }) {
    const user = await User.findOne({ where: { email } });
    return user;
  }
}

module.exports = AuthService;