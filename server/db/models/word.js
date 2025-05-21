'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'authorId' });
      this.belongsTo(models.Theme, { foreignKey: 'themeId' });
      this.hasMany(models.LearnWord, { foreignKey: 'wordId' });
    }
  }
  Word.init(
    {
      english: DataTypes.STRING,
      russian: DataTypes.STRING,
      themeId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Word',
    }
  );
  return Word;
};
