const OrdersController = require('../../controllers/orders.controller.js');

let mockOrdersService = {
  getOrder: jest.fn(),
  getMangers: jest.fn(),
  putFirstOrder: jest.fn(),
  putOrderUpdate: jest.fn(),
  getOrderById: jest.fn(),
  createOrder: jest.fn()
};

let mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  render: jest.fn(),
};

let ordersController = new OrdersController();
ordersController.ordersService = mockOrdersService;

describe('3계층 아키텍처 패턴 orders 컨트롤러 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('Posts Controller getPosts Method by Success', async () => {
    const getOrderValue = [
      {
        address: '주소',
        clothType: '이불',
        phoneNumber: 20323341,
        picture: '라이언 증명사진',
        requests: '와인 쏟음',
        status: 0,
        createdAt: 'Today'
      },
      {
        address: '주소2',
        clothType: '이불2',
        phoneNumber: 1234555,
        picture: '어차피 증명사진',
        requests: '컵라면 쏟음',
        status: 0,
        createdAt: 'Today'
      }
      ];

    mockOrdersService.getOrder = jest.fn(() => {
      return getOrderValue;
    });

    await ordersController.getOrder(mockRequest, mockResponse);
    expect(mockOrdersService.getOrder).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.render).toHaveBeenCalledWith(
      '../views/orderHistory.ejs', {
        data: getOrderValue,

      });
  });

});