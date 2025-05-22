const express = require("express");
const WordController = require("../controllers/WordController");
const validateId = require("../middlewares/validateId");
const { verifyAccessToken } = require("../middlewares/verifyTokens");

const wordRouter = express.Router();
// все слова c бд для реализации прогресс
wordRouter.get("/progress", WordController.getAllWordsFromDb);
// создание нового слова или ошибка Word already exists
wordRouter.post("/createWord", verifyAccessToken, WordController.createOrFindWord);
// все не изученные слова юзера  - конкретной темы
wordRouter.get("/theme/:themId", validateId, WordController.getUnlearnedWordsByOneTheme);
//  редактирование
wordRouter.patch("/edditWord/:id", validateId, WordController.updateWord);
// удаление
// возможно без :id?
wordRouter.delete("/myWord/:id", validateId, WordController.deleteOneWord);

module.exports = wordRouter;
