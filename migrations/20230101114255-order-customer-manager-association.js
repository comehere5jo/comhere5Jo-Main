'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Orders', {
      fields: ['customerId'],
      type: 'foreign key',
      name: 'order_customer_association',
      references: {
        table: 'Customers', //  table이름은 DB에서  복수형이고, 대문자로 시작하는 것을 명심
        field: 'id',
      },
    });
    await queryInterface.addConstraint('Orders', {
      fields: ['managerId'],
      type: 'foreign key',
      name: 'order_manager_association',
      references: {
        table: 'Managers', // table이름은  DB에서복수형이고, 대문자로 시작하는 것을 명심
        field: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Orders',
      'order_customer_association',
    );
    await queryInterface.removeConstraint(
      'Orders',
      'order_manager_association',
    );
  },
};
