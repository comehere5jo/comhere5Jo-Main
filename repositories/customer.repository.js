// const { Customer } = require('.././models');

class CustomerRepository {
  constructor(CustomerModel) {
    this.CustomerModel = CustomerModel;
  }

  findAllCustomer = async () => {
    const findCustomers = await this.CustomerModel.findAll();
    return findCustomers;
  };

  findOneCustomer = async function (id) {
    return await this.CustomerModel.findOne({ where: { id } });
  };

  createCustomer = async (loginId, loginPw, name) => {
    const createCustomerData = await this.CustomerModel.create({
      loginId,
      loginPw,
      name,
    });
    return createCustomerData;
  };
}

customerPoint = async (id) => {
  const customerPoint = await this.CustomerModel.findByPk(id);
  return customerPoint;
};

module.exports = CustomerRepository;
