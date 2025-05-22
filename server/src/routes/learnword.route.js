const express = require('express');
const LearnWordController = require('../controllers/LearnWordController');
const validateId = require('../middlewares/validateId');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

const learnWordRouter = express.Router();

// все изученные слова юзера - конкретной темы для прогресса
// работает , но через req.body , однако мы делаем это для
// френдли юзинга, который мы задумаои изначально. Однако позже вернемся к этому вопросу
// 13:11
learnWordRouter.get('/progress', LearnWordController.getLearnWordsByTheme);
// запись в бд изученного слова
// работает 13:45
learnWordRouter.post('/theme/:themeId', /*verifyAccessToken,*/ LearnWordController.createLearnWord);
// все изученные слова юзера
// для полного прогресс бара всех изученных
// learnWordRouter.get('/', LearnWordController.getLearnWords);

module.exports = learnWordRouter;