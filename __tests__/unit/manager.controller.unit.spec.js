const ManagerController = require('../../controllers/manager.controller');
let mockManagerService = {
  getManagerPoint: jest.fn(),
  managerSignup: jest.fn(),
  managerSignin: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
  manager: jest.fn()
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  render: jest.fn(),
  send: jest.fn()
};
let managerController = new ManagerController();
managerController.managerService = mockManagerService;

describe('3계층 아키텍처 패턴 매니저 컨트롤러 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('사장님 포인트 확인 테스트', async () => {
    const pointReturnValue =
      {
        id: 1,
        point: 1000000
      }
      mockRequest.manager = 1
    ;

    mockManagerService.getManagerPoint = jest.fn(() => {
      return pointReturnValue;
    });

    await managerController.getManagerPoint(mockRequest, mockResponse);
    expect(mockManagerService.getManagerPoint).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: pointReturnValue,
    });
  });

  test('사장님 회원가입 테스트', async () => {
    const managerSignup = {
      loginId: 'TestId',
      loginPw: 1234,
      confirmPw: 1234,
      name: 'TestName'
    };

    mockManagerService.managerSignup = jest.fn(() => managerSignup);
    await managerController.managerSignup(mockRequest, mockResponse);


    expect(mockManagerService.managerSignup).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.send).toHaveBeenCalledWith({
      message: "회원가입 완료!"
    });
  });

  test('사장님 로그인 테스트', async () => {
    const managerSignin = {
      loginId: 'TestId',
      loginPw: 'TestPw',
    };
    mockManagerService.managerSignin = jest.fn(() => managerSignup);
    await managerController.managerSignin(mockRequest, mockResponse);


    expect(mockManagerService.managerSignin).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    expect(mockResponse.send).toHaveBeenCalledWith({
      errorMessage: '로그인에 실패하였습니다.'
    });
  });
  });
