'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Reviews', {
      fields: ['customer_id'],
      type: 'foreign key',
      name: 'review_customer_association',
      references: {
        table: 'Customers', //  table이름은 DB에서  복수형이고, 대문자로 시작하는 것을 명심
        field: 'id',
      },
    });
    await queryInterface.addConstraint('Reviews', {
      fields: ['manager_id'],
      type: 'foreign key',
      name: 'review_manager_association',
      references: {
        table: 'Managers', // table이름은  DB에서복수형이고, 대문자로 시작하는 것을 명심
        field: 'id',
      },
    });
    await queryInterface.addConstraint('Reviews', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'review_order_association',
      references: {
        table: 'Orders', // table이름은  DB에서복수형이고, 대문자로 시작하는 것을 명심
        field: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Reviews',
      'order_customer_association',
    );
    await queryInterface.removeConstraint(
      'Reviews',
      'review_manager_association',
    );
    await queryInterface.removeConstraint(
      'Reviews',
      'review_order_association',
    );
  },
};
