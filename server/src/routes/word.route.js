const express = require("express");
const WordController = require("../controllers/WordController");
const validateId = require("../middlewares/validateId");
const { verifyAccessToken } = require("../middlewares/verifyTokens");
// Вест роутер отрабтаывает , если не включать верификацию токенов! 22.05 12:33
const wordRouter = express.Router();
// все слова c бд для реализации общего прогресс бар (работает с роу запросом)
wordRouter.get("/progress",verifyAccessToken, WordController.getAllWordsFromDb);

// создание нового слова или ошибка Word already exists (работает с роу запросом)
wordRouter.post("/createWord", verifyAccessToken, WordController.createOrFindWord);

// все не изученные слова юзера  - конкретной темы (работает!!! с роу запросом)
wordRouter.get("/theme/:themeId",verifyAccessToken, validateId, WordController.getUnlearnedWordsByOneTheme);
//  редактирование (работает)
wordRouter.patch("/edditWord/:id",verifyAccessToken, validateId, WordController.updateWord);
// удаление
// (работает с параметизированным запросом)
// wordRouter.delete("/edditWord/:id", validateId, WordController.deleteOneWord);

// удаление через логику рек бади на клиенте
// работает тоже! Не отклоняясь от логики excalidraw
wordRouter.delete("/myWord", WordController.deleteOneWord);

module.exports = wordRouter;
