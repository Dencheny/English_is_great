const express = require('express');
const ThemeController = require('../controllers/ThemeController');
const validateId = require('../middlewares/validateId');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

const themeRouter = express.Router();

// получение всех тем для отрисовки
themeRouter.get('/themes', ThemeController.getAllThemesFromDb);

module.exports = themeRouter;