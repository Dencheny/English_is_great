const cookieConfig = require('../configs/cookieConfig');
const AuthService = require('../services/AuthService');
const generateTokens = require('../utils/generateTokens');
const formatResponse = require('../utils/formatResponse');
const bcrypt = require('bcrypt');

class AuthController {
  static async signup(req, res) {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const { user, created } = await AuthService.register({
        email,
        name,
        password: hashedPassword,
      });

      if (!created) {
        return res.status(400).json(400, 'User already exists');
      }
      const plainUser = user.get();
      console.log('plainUser', plainUser);

      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json(formatResponse(201, 'Success', { accessToken, user: plainUser }));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json(formatResponse(400, 'Missing required fields'));
    }

    try {
      const user = await AuthService.getUserByEmail({ email });
      if (!user) {
        return res.status(400).json(formatResponse(400, 'User not found'));
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log('isValidPassword', isValidPassword);

      if (!isValidPassword) {
        return res
          .status(400)
          .json(formatResponse(400, 'Invalid email or password'));
      }

      const plainUser = user.get();
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });
      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json(formatResponse(200, 'Success', { accessToken, user: plainUser }));
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  static async logout(req, res) {
    res.clearCookie('refreshToken').json(formatResponse(200, 'Success'));
  }

  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals; // из middleware verifyRefreshToken

      const { accessToken, refreshToken } = generateTokens({ user });

      res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json(
          formatResponse(200, 'Success', {
            user,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = AuthController;
