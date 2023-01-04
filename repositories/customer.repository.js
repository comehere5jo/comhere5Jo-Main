class CustomerRepository {
  constructor(customerModel) {
    this.customerModel = customerModel;
  }

  findAllCustomer = async () => {
    const findCustomers = await this.customerModel.findAll();
    return findCustomers;
  };

  findCertainCustomer = async (loginId) => {
    try {
      const findCustomer = await this.customerModel.findOne({ where: { loginId } });
      return findCustomer;
    } catch (error) {
      return error;
    }
  };

  findOneCustomer = async function (id) {
    return await this.customerModel.findOne({ where: { id } });
  };

  createCustomer = async (loginId, encryptedPassword, name) => {
    const createCustomerData = await this.customerModel.create({
      loginId,
      loginPw: encryptedPassword,
      name,
    });
    return createCustomerData;
  };

  //손님포인트조회
  findCustomerPoint = async (id) => {
    const customerPoint = await this.customerModel.findByPk(id);
    return customerPoint;
  };
}

module.exports = CustomerRepository;
