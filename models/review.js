'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Review.belongsTo(models.Manager, {
        foreignKey: 'managerId',
        as: 'manager',
        onDelete: 'NO ACTION',
      });
      models.Review.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer',
        onDelete: 'NO ACTION',
      });
      models.Review.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order',
        onDelete: 'NO ACTION ',
      });
    }
  }
  Review.init(
    {
      orderId: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
      managerId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      picture: DataTypes.TEXT,
      comment: DataTypes.TEXT,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Review',
    },
  );
  return Review;
};
