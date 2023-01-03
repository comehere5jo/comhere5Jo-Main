// __tests__/unit/posts.repository.unit.spec.js
const ManagerRepository = require('../../repositories/manager.repository')


// posts.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockManagerModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}

let managerRepository = new ManagerRepository(mockManagerModel);

describe('Layered Architecture Pattern Posts Repository Unit Test', () => {

  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

  test('Manager Repository findManager Method', async () => {
     mockManagerModel.findAll = jest.fn(() => {
      return "findAll String"
     })
     const findManager = await managerRepository.findManager()
     expect(managerRepository.managerModel.findAll).toHaveBeenCalledTimes(1)
     expect(findManager).toBe('findAll String')

  });


  test('Manager Repository createPost Method', async () => {
    mockManagerModel.create = jest.fn(() => {
      return "create Return String"
    })
    const createManagerParams = {
      loginId: "createManagerLoginId",
      loginPw: "createManagerLoginPw",
      name: "createManagerName",
    }
    const createManagerData = await managerRepository.createManager(
      createManagerParams.loginId,
      createManagerParams.loginPw,
      createManagerParams.name
    )
    expect(createManagerData).toBe("create Return String")
    expect(mockManagerModel.create).toHaveBeenCalledTimes(1)
    expect(mockManagerModel.create).toHaveBeenCalledWith({
      loginId: createManagerParams.loginId,
      loginPw: createManagerParams.loginPw,
      name: createManagerParams.name
    })
  });
  
});