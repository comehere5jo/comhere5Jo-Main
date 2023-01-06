const OrdersController = require('../../controllers/orders.controller.js');
let mockOrderService = {
  getOrder: jest.fn(),
  findCustomerOrder: jest.fn(),
  selectOrder: jest.fn(),
  updateOrder: jest.fn(),
  findAllOrder: jest.fn(),
  createOrder: jest.fn(),
  acceptOrder: jest.fn(),
  findMyOrder: jest.fn(),
  findOrderById: jest.fn(),
  findOrderByCustomer:jest.fn()
};
let mockCustomerService = {
  findByPk:jest.fn()
}

let mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
  manager: jest.fn(),
  customer: jest.fn(),
  id: jest.fn(),
  headers: jest.fn()
};
let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  render: jest.fn()
};
let orderController = new OrdersController();
orderController.orderService = mockOrderService;
orderController.customerService = mockCustomerService;

describe('오더 컨트롤러 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });

    mockRequest.manager = jest.fn(() => {
      return mockRequest;
    });

  });
  test('주문 조회 테스트(getOrder)', async () => {
    const getOrderValue = [ {
      address: "laundry.address",
      clothType: "laundry.clothType",
      phoneNumber: "laundry.phoneNumber",
      picture: "laundry.picture",
      requests: "laundry.requests",
      status: "laundry.status",
      createdAt: "laundry.createdAt"
    } ];
    mockRequest.manager = { id: 1 };

    mockOrderService.findAllOrderStatus0 = jest.fn(() => {
      getOrderValue;
    });
    await orderController.getOrder(mockRequest, mockResponse);
    expect(mockOrderService.getOrder).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test('주문 수락 테스트(putFirstOrder)', async () => {
    const managerIdParams = {
      id: 'aaaaa'
    };
    const orderIdParams = {
      orderId: 'bbbbb'
    };

    mockRequest.manager = managerIdParams;
    mockResponse.params = orderIdParams;
    const firstOrder = 1111;
    mockOrderService.acceptOrder = jest.fn(() => {
      return firstOrder;
    });
    await orderController.putFirstOrder(mockRequest, mockResponse);
    expect(mockOrderService.acceptOrder).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //현재 200이 되야하는데 400이 뜸
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test('주문 수정 테스트(putOrderUpdate)', async () => {
    const reqParams = {
      managerId: 'aaaaa',
      orderId: 'bbbbb'
    };
    const reqBody = {
      status: 1
    };
    mockRequest.body = reqBody;
    mockResponse.params = reqParams;

    const updateOrder = 1111;
    mockOrderService.updateOrder = jest.fn(() => {
      return updateOrder;
    });
    await orderController.putOrderUpdate(mockRequest, mockResponse);
    expect(mockOrderService.updateOrder).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test('주문 조회 테스트(getMyOrders)', async () => {
    mockRequest.customer = { id: 1 };
    await orderController.getMyOrders(mockRequest, mockResponse);
    expect(mockOrderService.findMyOrder).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test('주문 상세 조회 테스트(getOrderById)', async () => {
    mockRequest.params = { orderId: 1 };
    mockRequest.headers = { cookie: "asdf" };

    const orderById = 1111;
    mockOrderService.findOrderById = jest.fn(() => {
      return orderById;
    });

    const cookie = 'asdf';
    mockOrderService.findOrderById = jest.fn(() => {
      return cookie;
    });

    await orderController.getOrderById(mockRequest, mockResponse);
    expect(mockOrderService.findOrderById).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test('주문 요청 테스트(createOrder)', async () => {
    const BodyParams = {
      phoneNumber: "phoneNumber",
      address: "address",
      clothType: "clothType",
      picture: "picture",
      requests: "requests"
    };
    const params = {
      customerId: "customerId"
    };
    mockRequest.body = BodyParams;
    mockResponse.params = params;
    const createOrderData = '모든 정보를';
    mockOrderService.createOrder = jest.fn(() => {
      return createOrderData;
    });
    await orderController.createOrder(mockRequest, mockResponse);
    expect(mockOrderService.createOrder).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //현재 200이 되야하는데 400이 뜸
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

  test('손님 마이페이지 테스트(getMypage)', async () => {
    mockRequest.customer = { id: 1 };
    mockRequest.headers = { cookie: "mypage" };

    const customerInfo = 1
    mockCustomerService.findByPk = jest.fn(()=>{
      return customerInfo
    })


    const orderById = 222;
    mockOrderService.findOrderByCustomer = jest.fn(() => {
      return orderById;
    });

    const cookie = 'mypage';
    mockOrderService.findOrderByCustomer = jest.fn(() => {
      return cookie;
    });

    await orderController.getMypage(mockRequest, mockResponse);
    expect(mockOrderService.findOrderByCustomer).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

});
