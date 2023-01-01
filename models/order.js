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
        foreignKey: 'manager_id',
        as: 'manager',
        onDelete: 'NO ACTION',
      });
      models.Order.belongsTo(models.Customer, {
        foreignKey: 'customer_id',
        as: 'customer',
        onDelete: 'NO ACTION',
      });
      models.Order.hasOne(models.Review, {
        foreignKey: 'review_id',
        as: 'review',
        onDelete: 'NO ACTION',
      });
    }
  }
  Order.init(
    {
      customer_id: DataTypes.INTEGER,
      manager_id: DataTypes.INTEGER,
      phone_number: DataTypes.INTEGER,
      address: DataTypes.STRING,
      cloth_type: DataTypes.STRING,
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
