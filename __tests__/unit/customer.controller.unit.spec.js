const CustomerController = require('../../controllers/customer.controller.js');

jest.mock('jsonwebtoken', ()=>({get: () => 'fr'}))

let mockCustomerService = {
  getCustomerPoint: jest.fn(),
  customerSignup: jest.fn(),
  customerSignin: jest.fn(),
  customerSignout: jest.fn()

};

let mockRequest = {
  body: jest.fn(),
  customer: jest.fn()
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  send: jest.fn(),
  clearCookie: jest.fn()
};



let customerController = new CustomerController();
customerController.customerService = mockCustomerService;


describe('Layered Architecture Pattern Customer Controller Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });


  test('손님 포인트 찾기 테스트(getCustomerPoint)', async () => {
    const pointReturnValue = [
      {
        id: 1,
        point: 1000000
      },
      mockRequest.customer = 1
    ];
    mockCustomerService.getCustomerPoint = jest.fn(() => pointReturnValue);

    await customerController.getCustomerPoint(mockRequest, mockResponse);

    expect(mockCustomerService.getCustomerPoint).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      point: pointReturnValue,
    });


  });

  test('고객 회원가입 테스트(customerSignup)', async () => {

    const customerSignupValue = {
      loginId: 'TestId',
      loginPw: 'TestPw',
      config: 'TestConfig',
      configPw: 'TestConfigpw',
      name: 'TestNate',
    };

    mockCustomerService.customerSignup = jest.fn(() => customerSignupValue);

    await customerController.customerSignup(mockRequest, mockResponse);

    expect(mockCustomerService.customerSignup).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.send).toHaveBeenCalledWith({
      message: '회원가입 완료!'
    });
  });

  test('고객 로그인 테스트(customerSignin)', async () => {
    const customerSigninValue = {
      loginId: 'TestId',
      loginPw: 'TestPw',
    };

    mockCustomerService.customerSignin = jest.fn(() => customerSigninValue);


    await customerController.customerSignin(mockRequest, mockResponse);
    expect(mockCustomerService.customerSignin).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    expect(mockResponse.send).toHaveBeenCalledWith({
      errorMessage: '로그인에 실패하였습니다.'
    });
  });


  test('고객 로그아웃 테스트(customerSignout)', async () => {
    console.log("죄송합니다. 로그아웃 테스트 기능 구현 실패했습니다.");

  });


});

