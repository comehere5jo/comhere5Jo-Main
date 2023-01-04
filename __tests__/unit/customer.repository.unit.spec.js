
const CustomerRepository = require("../../repositories/customer.repository.js");



let mockCustomerModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}

let customerRepository = new CustomerRepository(mockCustomerModel);

describe('Layered Architecture Pattern Customer Repository Unit Test', () => {


  beforeEach(() => {
    jest.resetAllMocks(); 
  })

//findAllCustomer
//findCertainCustomer
//findOneCustomer
//createCustomer
//findCustomerPoint

  test('Customer Repository findAllCustomer Method', async () => {
    mockCustomerModel.findAll = jest.fn(() => {
      return "findAll String"
    });
    const customer = await customerRepository.findAllCustomer();
    expect(customerRepository.customerModel.findAll).toHaveBeenCalledTimes(1);
    expect(customer).toBe("findAll String");
  });

  test('Customer Repository findCertainCustomer Method', async () => {
    mockCustomerModel.findOne = jest.fn(() => {
      return "findOne String"
    });
    const customer = await customerRepository.findCertainCustomer();
    expect(customerRepository.customerModel.findOne).toHaveBeenCalledTimes(1);
    expect(customer).toBe("findOne String");
  });

  test('Customer Repository findOneCustomer Method', async () => {
    mockCustomerModel.findOne = jest.fn(() => {
      return "findOne String"
    });
    const customer = await customerRepository.findOneCustomer();
    expect(customerRepository.customerModel.findOne).toHaveBeenCalledTimes(1);
    expect(customer).toBe("findOne String");
  });

  test('Customer Repository createCustomer Method', async () => {
    mockCustomerModel.create = jest.fn(() => {
      return "create Return String"
    });
    const createCustomerParams = {
      loginId: "createPostNickname",
      loginPw: "createPostLoginPw",
      name: "createName",
    }
    const createCustomerData = await customerRepository.createCustomer(
      createCustomerParams.loginId,
      createCustomerParams.loginPw,
      createCustomerParams.name,
    );
    expect(createCustomerData).toBe("create Return String");
    expect(mockCustomerModel.create).toHaveBeenCalledTimes(1);
    expect(mockCustomerModel.create).toHaveBeenCalledWith({
      loginId: createCustomerParams.loginId,
      loginPw: createCustomerParams.loginPw,
      name: createCustomerParams.name,
    });
  });


  test('Customer Repository findCustomerPoint Method', async () => {
    mockCustomerModel.findByPk = jest.fn(() => {
      return "findByPk String"
    });
    const customer = await customerRepository.findCustomerPoint();
    expect(customerRepository.customerModel.findByPk).toHaveBeenCalledTimes(1);
    expect(customer).toBe("findByPk String");
  });



});