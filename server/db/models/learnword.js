'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LearnWord extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Word, { foreignKey: 'wordId' });
      this.belongsTo(models.Theme, { foreignKey: 'themeId' });
    }
  }
  LearnWord.init(
    {
      wordId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      themeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'LearnWord',
    }
  );
  return LearnWord;
};
