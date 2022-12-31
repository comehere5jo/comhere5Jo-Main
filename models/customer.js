'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Customer.hasMany(models.Order, {foreignKey: "customer_id"});
      models.Customer.hasMany(models.Review, {foreignKey: "customer_id"});
    }
  }
  Customer.init({
    login_id: DataTypes.STRING,
    pw: DataTypes.STRING,
    point: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};