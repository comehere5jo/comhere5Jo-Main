// __tests__/unit/posts.repository.unit.spec.js
const ManagerRepository = require('../../repositories/manager.repository');


// posts.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockManagerModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  findOne: jest.fn()
};

let managerRepository = new ManagerRepository(mockManagerModel);

describe('Layered Architecture Pattern manager Repository Unit Test', () => {

  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('사장님 조회 테스트(findManager)', async () => {
    mockManagerModel.findAll = jest.fn(() => {
      return "findAll Result";
    });

    const findManager = await managerRepository.findManager();

    expect(mockManagerModel.findAll).toHaveBeenCalledTimes(1);
    expect(findManager).toBe('findAll Result');

  });

  test('특정 사장님 조회 테스트(findCertainManager)', async () => {
    mockManagerModel.findOne = jest.fn(() => {
      return "findOne Result";
    });

    const findManager = await managerRepository.findCertainManager();

    expect(mockManagerModel.findOne).toHaveBeenCalledTimes(1);
    expect(findManager).toBe('findOne Result');
  });

  test('사장님 회원가입 테스트(createManager)', async () => {
    mockManagerModel.create = jest.fn(() => {
      return "create Return";
    });
    const createManagerParams = {
      loginId: "createManagerLoginId",
      loginPw: "createManagerLoginPw",
      name: "createManagerName",
    };
    const createManagerData = await managerRepository.createManager(
      createManagerParams.loginId,
      createManagerParams.loginPw,
      createManagerParams.name
    );
    expect(createManagerData).toBe("create Return");
    expect(mockManagerModel.create).toHaveBeenCalledTimes(1);
    expect(mockManagerModel.create).toHaveBeenCalledWith({
      loginId: createManagerParams.loginId,
      loginPw: createManagerParams.loginPw,
      name: createManagerParams.name
    });
  });

  test('사장님 상세조회 테스트(findOneManager)', async () => {
    mockManagerModel.findOne = jest.fn(() => {
      return "findOne Result";
    });

    const findManager = await managerRepository.findOneManager();

    expect(mockManagerModel.findOne).toHaveBeenCalledTimes(1);
    expect(findManager).toBe('findOne Result');
  });

  test('사장님 포인트 조회 테스트(managerPointUpdate)', async () => {
    mockManagerModel.update = jest.fn(() => {
      return "update Return";
    });

    const createManagerParams = {
      point: "updateManagerPoint",
      id: "id",
    };

    const updateManagerData = await managerRepository.managerPointUpdate(
      createManagerParams.point,
      createManagerParams.id
    );

    expect(updateManagerData).toBe("update Return");
    expect(mockManagerModel.update).toHaveBeenCalledTimes(1);
    expect(mockManagerModel.update).toHaveBeenCalledWith(
    { point: createManagerParams.point},
      {where: { id: createManagerParams.id } });
  });


});