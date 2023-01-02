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
        foreignKey: 'manager_id',
        as: 'manager',
        onDelete: 'NO ACTION',
      });
      models.Review.belongsTo(models.Customer, {
        foreignKey: 'customer_id',
        as: 'customer',
        onDelete: 'NO ACTION',
      });
      models.Review.belongsTo(models.Order, {
        foreignKey: 'order_id',
        as: 'order',
        onDelete: 'NO ACTION',
      });
    }
  }
  Review.init(
    {
      order_id: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      manager_id: DataTypes.INTEGER,
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
