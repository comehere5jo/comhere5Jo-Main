// __tests__/unit/posts.repository.unit.spec.js
const OrderRepository = require('../../repositories/order.repository');


// posts.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockOrderModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  findOne: jest.fn()
};

let orderRepository = new OrderRepository(mockOrderModel);

describe('Layered Architecture Pattern order Repository Unit Test', () => {

  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('주문 조회 테스트( findAll )', async () => {
    mockOrderModel.findAll = jest.fn(() => {
      return "findAll Result";
    });

    const findAllOrder = await orderRepository.findAllOrder();

    expect(mockOrderModel.findAll).toHaveBeenCalledTimes(1);
    expect(findAllOrder).toBe('findAll Result');

  });

  test('주문 조회 테스트( findAllOrderStatus0 ) Method', async () => {
    mockOrderModel.findAll = jest.fn(() => {
      return "findAll Result";
    });

    const findAllOrderStatus = await orderRepository.findAllOrderStatus0();

    expect(mockOrderModel.findAll).toHaveBeenCalledTimes(1);
    expect(findAllOrderStatus).toBe('findAll Result');
  });

  test('주문 상세 조회 테스트( findOrderById )', async () => {
    mockOrderModel.findByPk = jest.fn(() => {
      return "findByPk Result";
    });

    const findOrderById = await orderRepository.findOrderById();

    expect(mockOrderModel.findByPk).toHaveBeenCalledTimes(1);
    expect(findOrderById).toBe('findByPk Result');
  });

  test('주문 요청 테스트( createOrder )', async () => {
    mockOrderModel.create = jest.fn(() => {
      return "create Return";
    });
    const createOrderParams = {
      customerId: "createOrder",
      phoneNumber: "createOrder",
      address: "createOrder",
      clothType: "createOrder",
      picture: "createOrder",
      requests: "createOrder",
    };

    const createOrder = await orderRepository.createOrder(
      createOrderParams.customerId,
      createOrderParams.phoneNumber,
      createOrderParams.address,
      createOrderParams.clothType,
      createOrderParams.picture,
      createOrderParams.requests,
    );
    expect(createOrder).toBe("create Return");
    expect(mockOrderModel.create).toHaveBeenCalledTimes(1);
    expect(mockOrderModel.create).toHaveBeenCalledWith({
      customerId:createOrderParams.customerId,
      phoneNumber: createOrderParams.phoneNumber,
      address: createOrderParams.address,
      clothType: createOrderParams.clothType,
      picture: createOrderParams.picture,
      requests: createOrderParams.requests,
    });
  });

  test('주문 수정 테스트( statusUpdate )', async () => {
    mockOrderModel.update = jest.fn(() => {
      return "update Return";
    });

    const createOrderParams = {
      status: "updateOrderPoint",
      id: "id",
    };

    const updateOrderData = await orderRepository.statusUpdate(
      createOrderParams.status,
      createOrderParams.id
    );

    expect(updateOrderData).toBe("update Return");
    expect(mockOrderModel.update).toHaveBeenCalledTimes(1);
    expect(mockOrderModel.update).toHaveBeenCalledWith(
      { status: createOrderParams.status },
      { where: { id: createOrderParams.id } });
  });


});