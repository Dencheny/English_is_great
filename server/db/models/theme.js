'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    static associate(models) {
      this.hasMany(models.Word, { foreignKey: 'themeId' });
      this.hasMany(models.LearnWord, { foreignKey: 'themeId' });
    }
  }
  Theme.init(
    {
      themeName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Theme',
    }
  );
  return Theme;
};
