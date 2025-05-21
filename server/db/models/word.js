'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    static associate(models) {

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
