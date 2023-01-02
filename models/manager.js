'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Manager.hasMany(models.Order, {foreignKey: "managerId"});
      models.Manager.hasMany(models.Review, {foreignKey: "managerId"});

    }
  }
  Manager.init({
    loginId: DataTypes.STRING,
    loginPw: DataTypes.STRING,
    point: DataTypes.INTEGER,
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Manager',
  });
  return Manager;
};