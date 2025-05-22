const ThemeService = require('../services/ThemeService')
const formatResponse = require('../utils/formatResponse');

class ThemeConroller {
  // все темы c бд
  static async getAllThemesFromDb(req, res) {
    try {
      // const { user } = res.locals; // возможно придется удалить проверку
      // if (!user) {
      //  return res.status(401).json(formatResponse(401, 'Unauthorized: User not authenticated'));
      // } 
      // правильный код, если проверка на user из res.locals провалилась
      // потому что 401 - означает Unauthorized: User not authenticated
      const allThemes = await ThemeService.getAllThemes(); 
      if (allThemes.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, 'No Themes found', []));
      }
      return res.status(200).json(formatResponse(200, 'Success', allThemes));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async addTheme(req, res) {
    const { themeName } = req.body;
    
    if (!themeName) return res.status(400).json(formatResponse(400, 'themeName is required'));
    try {
        const newTheme = await ThemeService.addTheme(themeName)
        res.status(201).json(formatResponse(201, 'Theme created successfully', newTheme));
      } catch (error) {
        console.error('Ошибка при создании темы:', error);
        res.status(500).json(formatResponse('Ошибка сервера'));
      }
  }
}

module.exports = ThemeConroller

