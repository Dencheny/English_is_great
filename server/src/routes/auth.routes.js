const authRouter = require('express').Router();
const AuthController = require('../controllers/AuthController');
const { verifyRefreshToken } = require('../middlewares/verifyTokens');

// работает
authRouter.post("/signup", AuthController.signup);
// работает
authRouter.post("/login", AuthController.login);
// работает
authRouter.get("/logout", AuthController.logout);
// работает
authRouter.get("/refreshTokens", verifyRefreshToken, AuthController.refreshTokens);

module.exports = authRouter;
