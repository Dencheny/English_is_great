const LearnWordService = require("../services/LearnWordService");
const formatResponse = require("../utils/formatResponse");
const LearnWordValidator = require("../utils/learnWordValidator");

class LearnWordController {
  // все изученные слова юзера - конкретной темы
  static async getLearnWordsByTheme(req, res) {
    try {
      console.log('LearnWordController.getLearnWords: Starting');
      const { user } = res.locals;
      console.log('LearnWordController.getLearnWords: res.locals.user:', user);
      if (!user) {
        console.log('LearnWordController.getLearnWords: No user in res.locals');
        return res.status(401).json(formatResponse(401, 'Unauthorized: User not authenticated'));
      }
      const userId = user.id;
      console.log('LearnWordController.getLearnWords: userId:', userId);
      const learnWords = await LearnWordService.markAllLearned(userId);
      console.log('LearnWordController.getLearnWords: learnWords:', learnWords);
      if (learnWords.length === 0) {
        return res.status(200).json(formatResponse(200, 'No learnWord found', []));
      }
      return res.status(200).json(formatResponse(200, 'Success', learnWords));
    } catch (err) {
      console.error('LearnWordController.getLearnWords error:', err.stack);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
    //   const { user } = res.locals; // из middleware verifyAccessToken
    //   if (!user) {
    //     return res
    //       .status(401)
    //       .json(formatResponse(401, "Unauthorized: User not authenticated"));
    //   }
    //   const { themeId } = req.body; 
    //   // const userId = 2
    //   const userId = user.id;
    //   // console.log('req.body', req.body)
    //   // console.log('userId, themeId',userId, themeId)
    //   const learnWords = await LearnWordService.markAllLearnedByTheme(
    //     userId,
    //     themeId
    //   );
    //   if (learnWords.length === 0) {
    //     return res
    //       .status(200)
    //       .json(formatResponse(200, "No learnWord found", []));
    //   }
    //   return res.status(200).json(formatResponse(200, "Success", learnWords));
    // } catch (err) {
    //   console.log(err);
    //   return res.status(500).json(formatResponse(500, "Internal Server Error"));
    // }
  }

  // запись в бд изученного слова
  static async createLearnWord(req, res) {
    const { themeId } = req.params;
    // console.log('themeId', typeof themeId)
    const { wordId } = req.body;
    // console.log('wordId', typeof wordId)
    const userId = res.locals.user.id;
    // const userId = 12
    // console.log('userId', typeof userId)
    // const { user } = res.locals; // из middleware verifyAccessToken
    // if (!user) {
    //   return res.status(401).json(formatResponse(401, 'Unauthorized: User not authenticated'));
    // }
    const { isValid, error } = LearnWordValidator.validate({
      wordId,
      userId,
      themeId,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation failed", null, error));
    }
    try {
      const { record, created } = await LearnWordService.createLearnWordByDb({
        wordId,
        userId,
        themeId,
      });
      if (created) {
        return res
          .status(200)
          .json(formatResponse(200, "already exist learnWord", record));
      }
      return res.status(201).json(formatResponse(201, "Success", record));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }

  // все изученные слова юзера
  static async getLearnWords(req, res) {
    try {
      const { user } = res.locals; // из middleware verifyAccessToken
      if (!user) {
        return res
          .status(401)
          .json(formatResponse(401, "Unauthorized: User not authenticated"));
      }
      const  userId  = user.id
      const learnWords = await LearnWordService.markAllLearned(userId); /// изменить
      if (learnWords.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "No learnWord found", []));
      }
      return res.status(200).json(formatResponse(200, "Success", learnWords));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }
}

module.exports = LearnWordController;

// Вариант без req.body
// class LearnWordController {
//   static async getLearnWordsByTheme(req, res) {
//     try {
//       const { user } = res.locals; // из middleware verifyAccessToken
//       if (!user) {
//         return res.status(401).json(formatResponse(401, 'Unauthorized: User not authenticated'));
//       }

//       const userId = user.id;
//       console.log('Fetching learned words for userId:', userId);

//       const learnWords = await LearnWordService.getAllLearnedWordsByUser(userId);
//       console.log('Learned words:', learnWords);

//       if (!learnWords || learnWords.length === 0) {
//         return res.status(200).json(formatResponse(200, 'No learned words found', []));
//       }

//       return res.status(200).json(formatResponse(200, 'Success', learnWords));
//     } catch (err) {
//       console.error('Error in getLearnWordsByTheme:', err);
//       return res.status(500).json(formatResponse(500, 'Internal Server Error'));
//     }
//   }

//   static async createLearnWord(req, res) {
//     const { themeId } = req.params;
//     const { wordId } = req.body;
//     const userId = res.locals.user.id;
//     const { user } = res.locals;

//     if (!user) {
//       return res.status(401).json(formatResponse(401, 'Unauthorized: User not authenticated'));
//     }

//     console.log('Creating learned word:', { userId, themeId, wordId });

//     const { isValid, error } = LearnWordValidator.validate({
//       wordId,
//       userId,
//       themeId,
//     });
//     if (!isValid) {
//       return res.status(400).json(formatResponse(400, 'Validation failed', null, error));
//     }

//     try {
//       const { record, created } = await LearnWordService.createLearnWordByDb({
//         wordId,
//         userId,
//         themeId,
//       });
//       console.log('Created learnWord:', record, 'Created:', created);

//       if (!created) {
//         return res.status(200).json(formatResponse(200, 'Already exists learnWord', record));
//       }
//       return res.status(201).json(formatResponse(201, 'Success', record));
//     } catch (error) {
//       console.error('Error in createLearnWord:', error);
//       return res.status(500).json(formatResponse(500, 'Internal Server Error'));
//     }
//   }
// }

// module.exports = LearnWordController;
