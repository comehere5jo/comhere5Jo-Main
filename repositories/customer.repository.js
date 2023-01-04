// const { Customer } = require('.././models');
// const { Op } = require('sequelize');

class CustomerRepository {
  constructor(CustomerModel) {
    this.CustomerModel = CustomerModel;
  }

  findAllCustomer = async () => {
    const findCustomers = await this.CustomerModel.findAll();
    return findCustomers;
  };

  findCertainCustomer = async (loginId) => {
    try {
      const findCustomer = await this.CustomerModel.findOne({ where: { loginId } });
      return findCustomer;
    } catch (error) {
      return error;
    }
  };

  findOneCustomer = async function (id) {
    return await this.CustomerModel.findOne({ where: { id } });
  };

  createCustomer = async (loginId, encryptedPassword, name) => {
    const createCustomerData = await this.CustomerModel.create({
      loginId,
      loginPw: encryptedPassword,
      name,
    });
    return createCustomerData;
  };


  //손님포인트조회
  findCustomerPoint = async (id) => {
    const customerPoint = await this.CustomerModel.findByPk(id);
    return customerPoint;
  };
}

module.exports = CustomerRepository;
