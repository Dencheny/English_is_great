const express = require('express');
const ThemeController = require('../controllers/ThemeController');
const validateId = require('../middlewares/validateId');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

const themeRouter = express.Router();

// получение всех тем для отрисовки
// работает 12:37 22.05
themeRouter.get('/themes',/*verifyAccessToken,*/ ThemeController.getAllThemesFromDb);

module.exports = themeRouter;