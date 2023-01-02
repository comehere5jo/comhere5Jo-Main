'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      models.Order.belongsTo(models.Manager, {
        foreignKey: 'managerId',
        as: 'manager',
        onDelete: 'NO ACTION',
      });
      models.Order.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer',
        onDelete: 'NO ACTION',
      });
    

    }
  }
  Order.init(
    {
      customerId: DataTypes.INTEGER,
      managerId: DataTypes.INTEGER,
      phoneNumber: DataTypes.INTEGER,
      address: DataTypes.STRING,
      clothType: DataTypes.STRING,
      picture: DataTypes.TEXT,
      requests: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
