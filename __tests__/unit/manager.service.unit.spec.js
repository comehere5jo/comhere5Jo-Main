const ManagerService = require("../../services/manager.service.js");

let mockManagerService = {
  getMyPoint: jest.fn(),
  findCertainManager: jest.fn(),
  managerSignup: jest.fn(),
  managerSignin: jest.fn(),
  deletePost: jest.fn(),
};

let managerService = new ManagerService();
// postService의 Repository를 Mock Repository로 변경합니다.
managerService.ManagerRepository = mockManagerService;

describe('Layered Architecture Pattern Manager Service Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('사장님 회원가입 테스트(managerSignup)', async () => {
    // TODO: 여기에 코드를 작성해야합니다.
    const managerSignupParam = {
      loginId: 'asdfasdf',
      encryptedPassword: 12341234,
      name: '성민섭',
    };

    const managerSignupValue = {
      loginId: managerSignupParam.loginId,
      encryptedPassword: managerSignupParam.encryptedPassword,
      name: managerSignupParam.name,
      createdAt: new Date('07 October 2011 15:50 UTC'),
      updatedAt: new Date('07 October 2011 15:50 UTC')
    };
    mockManagerService.managerSignup = jest.fn(() => {
      return managerSignupValue;
    });

    const managerSignupData = await mockManagerService.managerSignup(
      managerSignupParam.loginId,
      managerSignupParam.encryptedPassword,
      managerSignupParam.name
    );

    expect(managerSignupData).toEqual(managerSignupValue);
    expect(mockManagerService.managerSignup).toHaveBeenCalledTimes(1);
    expect(mockManagerService.managerSignup).toHaveBeenCalledWith(
      managerSignupParam.loginId,
      managerSignupParam.encryptedPassword,
      managerSignupParam.name
    );

  });

  test('사장님 로그인 테스트(managerSignin)', async () => {
    const SigninValue = [
      {
        loginId : 'loginId',
        loginPw : 'loginPw',
      }
    ];

    mockManagerService.managerSignin = jest.fn(() => {
      return SigninValue
    });

    const SigninValueData = await mockManagerService.managerSignin()
    expect(SigninValueData).toEqual(SigninValue)
    expect(mockManagerService.managerSignin).toHaveBeenCalledTimes(1)

  });

  test('사장님 포인트 조회 테스트(getMyPoint)', async () => {
    const getMyPointValue = [
      {
        id : 'testId',
        point: 1000000,
      }
    ];

     mockManagerService.getMyPoint = jest.fn(() => {
      return getMyPointValue;
    });

     const getMyPointData = await mockManagerService.getMyPoint();
     expect(getMyPointData).toEqual(getMyPointValue)
     expect(mockManagerService.getMyPoint).toHaveBeenCalledTimes(1)

  });


});