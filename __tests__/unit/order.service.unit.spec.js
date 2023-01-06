const OrderService = require("../../services/order.service.js");

let mockOrderRepository = {
  getOrder: jest.fn(),
  findOrderById: jest.fn(),
  createOrder: jest.fn(),
  updateOrder: jest.fn(),
};

let orderService = new OrderService();
// postService의 Repository를 Mock Repository로 변경합니다.
orderService.OrderRepository = mockOrderRepository;

describe('Layered Architecture Pattern Order Service Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('주문 조회 테스트(toHaveBeenCalledTimes) ', async () => {
    const getOrderValue = [
      {
        address: '주소',
        clothType: '이불',
        phoneNumber: 20323341,
        picture: '라이언 증명사진',
        requests: '와인 쏟음',
        status: '0',
        createdAt: 'Today'
      },
      {
        address: '주소2',
        clothType: '이불2',
        phoneNumber: 1234555,
        picture: '어차피 증명사진',
        requests: '컵라면 쏟음',
        status: '1',
        createdAt: 'Today'
      } ];

    mockOrderRepository.getOrder = jest.fn(() => {
      return getOrderValue;
    });

    mockOrderRepository.getOrder();

    expect(mockOrderRepository.getOrder).toHaveBeenCalledTimes(1);
  });

  test('주문 상세 조회 테스트(toHaveBeenCalledTimes)', async () => {
    const findOrderByIdValue = [
      {
        orderId: 1,
        phoneNumber: 1234,
        address: '집',
        clothType: '신발',
        picture: '진로뚜겁',
        requests: '요청해염',
        createdAt: '오늘',
        updatedAt: '내일'
      } ];

    mockOrderRepository.findOrderById = jest.fn(() => {
      return findOrderByIdValue;
    });

    const getMyPointData = await mockOrderRepository.findOrderById();
    expect(getMyPointData).toEqual(findOrderByIdValue);
    expect(mockOrderRepository.findOrderById).toHaveBeenCalledTimes(1);


  });

  test('세탁 요청 테스트(createOrder)', async () => {
    const orderPostParam = {
      orderId: 1,
      phoneNumber: 1234,
      address: '집',
      clothType: '신발',
      picture: '진로뚜겁',
      requests: '요청해염',
      createdAt: '오늘',
      updatedAt: '내일'
    };

    const orderPostValue = {
      orderId: orderPostParam.orderId,
      phoneNumber: orderPostParam.phoneNumber,
      address: orderPostParam.address,
      clothType: orderPostParam.clothType,
      picture: orderPostParam.picture,
      requests: orderPostParam.requests,
      createdAt: orderPostParam.requests,
      updatedAt: orderPostParam.updatedAt
    };
    mockOrderRepository.createOrder = jest.fn(() => {
      return orderPostValue;
    });

    const orderSignupData = await mockOrderRepository.createOrder(
      orderPostParam.orderId,
      orderPostParam.phoneNumber,
      orderPostParam.address,
      orderPostParam.clothType,
      orderPostParam.picture,
      orderPostParam.requests,
      orderPostParam.createdAt,
      orderPostParam.updatedAt
    );

    expect(orderSignupData).toEqual(orderPostValue);
    expect(mockOrderRepository.createOrder).toHaveBeenCalledTimes(1);
    expect(mockOrderRepository.createOrder).toHaveBeenCalledWith(
      orderPostParam.orderId,
      orderPostParam.phoneNumber,
      orderPostParam.address,
      orderPostParam.clothType,
      orderPostParam.picture,
      orderPostParam.requests,
      orderPostParam.createdAt,
      orderPostParam.updatedAt
    );

  });

  test('주문 수정 테스트(updateOrder)', async () => {
    const orderUpdateParam = {
      orderId: 3,
      phoneNumber: 2032441,
      address: '집수정',
      clothType: '신발수정',
      picture: '고라파덕',
      requests: '수청해염',
      createdAt: '내일',
      updatedAt: '모래'
    };

    const orderUpdateParamValue = {
      orderId: orderUpdateParam.orderId,
      phoneNumber: orderUpdateParam.phoneNumber,
      address: orderUpdateParam.address,
      clothType: orderUpdateParam.clothType,
      picture: orderUpdateParam.picture,
      requests: orderUpdateParam.requests,
      createdAt: orderUpdateParam.requests,
      updatedAt: orderUpdateParam.updatedAt
    };
    mockOrderRepository.updateOrder = jest.fn(() => {
      return orderUpdateParamValue;
    });

    const orderUpdateData = await mockOrderRepository.updateOrder(
      orderUpdateParam.orderId,
      orderUpdateParam.phoneNumber,
      orderUpdateParam.address,
      orderUpdateParam.clothType,
      orderUpdateParam.picture,
      orderUpdateParam.requests,
      orderUpdateParam.createdAt,
      orderUpdateParam.updatedAt
    );

    expect(orderUpdateData).toEqual(orderUpdateParamValue);
    expect(mockOrderRepository.updateOrder).toHaveBeenCalledTimes(1);
    expect(mockOrderRepository.updateOrder).toHaveBeenCalledWith(
      orderUpdateParam.orderId,
      orderUpdateParam.phoneNumber,
      orderUpdateParam.address,
      orderUpdateParam.clothType,
      orderUpdateParam.picture,
      orderUpdateParam.requests,
      orderUpdateParam.createdAt,
      orderUpdateParam.updatedAt
    );

  });


});