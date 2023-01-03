const { Customer } = require('.././models');
const { Op } = require('sequelize');

class CustomerRepository {
  // constructor(CustomerModel) {
  //   this.CustomerModel = CustomerModel;
  // }

  findAllCustomer = async () => {
    const findCustomers = await Customer.findAll();
    return findCustomers;
  };

  findCertainCustomer = async (loginId) => {
    try {
      const findCustomer = await Customer.findOne({ where: { loginId } });
      return findCustomer;
    } catch (error) {
      return error;
    }
  };

  findOneCustomer = async function (id) {
    return await Customer.findOne({ where: { id } });
  };

  createCustomer = async (loginId, encryptedPassword, name) => {
    const createCustomerData = await Customer.create({
      loginId,
      loginPw: encryptedPassword,
      name,
    });
    return createCustomerData;
  };

  //손님포인트조회
  findCustomerPoint = async (id) => {
    const customerPoint = await Customer.findByPk(id);
    return customerPoint;
  };
}

module.exports = CustomerRepository;
