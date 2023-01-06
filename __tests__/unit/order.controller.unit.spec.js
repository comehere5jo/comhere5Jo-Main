const OrdersController = require('../../controllers/orders.controller.js')
let mockOrderService = {
  getOrder: jest.fn(),
  findCustomerOrder: jest.fn(),
  selectOrder:jest.fn(),
  updateOrder:jest.fn(),
  findAllOrder:jest.fn(),
  createOrder:jest.fn(),
  acceptOrder:jest.fn(),
  findMyOrder:jest.fn(),
  findOrderById:jest.fn(),
}
let mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
  manager:jest.fn(),
  customer:jest.fn(),
  id:jest.fn()
}
let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  render: jest.fn()
}
let orderController = new OrdersController()
orderController.orderService = mockOrderService
describe('오더 컨트롤러 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    mockRequest.manager = jest.fn(() => {
      return mockRequest;
    });
  })
  test('getOrder 테스트', async () => {
    const getOrderValue = [{
      address: "laundry.address",
      clothType: "laundry.clothType",
      phoneNumber: "laundry.phoneNumber",
      picture: "laundry.picture",
      requests: "laundry.requests",
      status: "laundry.status",
      createdAt: "laundry.createdAt"
    }]
    mockRequest.manager = {id:1}
  
    mockOrderService.findAllOrderStatus0 = jest.fn(() => {
      getOrderValue
    })
    await orderController.getOrder(mockRequest, mockResponse)
    expect(mockOrderService.getOrder).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  })

  test('putFirstOrder 테스트', async () => {
    const managerIdParams = {
      id: 'aaaaa'
    }
    const orderIdParams = {
      orderId: 'bbbbb'
    }
    
    mockRequest.manager = managerIdParams
    mockResponse.params =orderIdParams
    const firstOrder = 1111
    mockOrderService.acceptOrder = jest.fn(() => {
      return firstOrder
})
    await orderController.putFirstOrder(mockRequest, mockResponse)
    expect(mockOrderService.acceptOrder).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //현재 200이 되야하는데 400이 뜸
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  })

  
  test('putOrderUpdate 테스트', async () => {
    const reqParams = {
      managerId: 'aaaaa',
      orderId: 'bbbbb'
    }
    const reqBody = {
    status:1
    }
    mockRequest.body = reqBody
    mockResponse.params =reqParams
  
    const updateOrder = 1111
    mockOrderService.updateOrder = jest.fn(() => {
      return updateOrder
  })
    await orderController.putOrderUpdate(mockRequest, mockResponse)
    expect(mockOrderService.updateOrder).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //현재 200이 되야하는데 400이 뜸
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  })
  test('getMyOrders 테스트', async () => {
    mockRequest.customer = {id:1}
    await orderController.getMyOrders(mockRequest, mockResponse)
    expect(mockOrderService.findMyOrder).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  })


  test('getOrderById 테스트', async () => {
    mockRequest.params = {orderId:1}

    const orderById = 1111
    mockOrderService.findOrderById = jest.fn(() =>{
      return orderById
    })

    await orderController.getOrderById(mockRequest, mockResponse)
    expect(mockOrderService.findOrderById).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  })


  test('createOrder 테스트', async () => {
    const BodyParams = {
      phoneNumber: "phoneNumber",
      address: "address",
      clothType: "clothType",
      picture: "picture",
      requests:"requests"
    }
    const params = {
      customerId:"customerId"
    }
    mockRequest.body = BodyParams
    mockResponse.params =params
    const createOrderData = '모든 정보를'
    mockOrderService.createOrder = jest.fn(() => {
      return createOrderData
  })
    await orderController.createOrder(mockRequest, mockResponse)
    expect(mockOrderService.createOrder).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //현재 200이 되야하는데 400이 뜸
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  })
  
})
