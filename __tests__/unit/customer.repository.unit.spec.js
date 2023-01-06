
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

  // test('Customer Repository findAllCustomer Method', async () => {
  //   mockCustomerModel.findAll = jest.fn(() => {
  //     return "findAll String"
  //   });
  //   const customer = await customerRepository.findAllCustomer();
  //   expect(customerRepository.customerModel.findAll).toHaveBeenCalledTimes(1);
  //   expect(customer).toBe("findAll String");
  // });

  test('특정 손님 조희 테스트(findCertainCustomer)', async () => {
    mockCustomerModel.findOne = jest.fn(() => {
      return "findOne String"
    });
    const customer = await customerRepository.findCertainCustomer();
    expect(customerRepository.customerModel.findOne).toHaveBeenCalledTimes(1);
    expect(customer).toBe("findOne String");
  });

  test('손님 상세 조회 테스트(findOneCustomer)', async () => {
    mockCustomerModel.findOne = jest.fn(() => {
      return "findOne String"
    });
    const customer = await customerRepository.findOneCustomer();
    expect(customerRepository.customerModel.findOne).toHaveBeenCalledTimes(1);
    expect(customer).toBe("findOne String");
  });

  test('손님 회원가입 테스트(createCustomer)', async () => {
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


  // test('손님 포인트 조회 테스트', async () => {
  //   mockCustomerModel.findByPk = jest.fn(() => {
  //     return "findByPk String"
  //   });
  //   const customer = await customerRepository.findCustomerPoint();
  //   expect(customerRepository.customerModel.findByPk).toHaveBeenCalledTimes(1);
  //   expect(customer).toBe("findByPk String");
  // });



});