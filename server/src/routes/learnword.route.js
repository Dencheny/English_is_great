const express = require('express');
const LearnWordController = require('../controllers/LearnWordController');
const validateId = require('../middlewares/validateId');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

const learnWordRouter = express.Router();

// все изученные слова юзера - конкретной темы
learnWordRouter.get('/theme/:themId', LearnWordController.getLearnWordsByTheme);
// запись в бд изученного слова
learnWordRouter.post('/theme/:themId', verifyAccessToken, LearnWordController.createLearnWord);
// все изученные слова юзера
// для полного прогресс бара всех изученных
learnWordRouter.get('/', LearnWordController.getLearnWords);

module.exports = learnWordRouter;