const { Customer } = require('.././models');

class CustomerRepository {
  // constructor(CustomerModel) {
  //   this.CustomerModel = CustomerModel;
  // }

  findAllCustomer = async () => {
    const findCustomers = await Customer.findAll();
    return findCustomers;
  };

  findOneCustomer = async function (id) {
    return await Customer.findOne({ where: { id } });
  };

  createCustomer = async (loginId, loginPw, name) => {
    const createCustomerData = await Customer.create({
      loginId,
      loginPw,
      name,
    });
    return createCustomerData;
  };
}

customerPoint = async (id) => {
  const customerPoint = await Customer.findByPk(id);
  return customerPoint;
};

module.exports = CustomerRepository;
