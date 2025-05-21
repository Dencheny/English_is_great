const { Theme } = require('../../db/models');

class ThemeService {
 static getAllThemes() {
    return Theme.findAll({ order: [['updatedAt', 'DESC']] });
  }

  static getOneTheme(id) {
    return Theme.findByPk(id);
  }
}

module.exports = ThemeService