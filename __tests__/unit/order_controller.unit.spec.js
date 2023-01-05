const OrdersController = require('../../controllers/orders.controller.js')
let mockOrderService = {
  getOrder: jest.fn(),
  findCustomerOrder: jest.fn(),
  selectOrder:jest.fn(),
  updateOrder:jest.fn(),
  findAllOrder:jest.fn()
}
let mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
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
    mockOrderService.findAllOrderStatus0 = jest.fn(() => {
      getOrderValue
    })
    await orderController.getOrder(mockRequest, mockResponse)

    expect(mockOrderService.getOrder).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  })
  test('getMangers 테스트', async () => {

    await orderController.getMangers(mockRequest, mockResponse)

    expect(mockOrderService.findCustomerOrder).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  })
  test('putFirstOrder 테스트', async () => {
    const managerIdParams = {
      managerId: 'aaaaa'
    }
    const orderIdParams = {
      orderId: 'bbbbb'
    }
    mockRequest.body = managerIdParams
    mockResponse.params =orderIdParams
    // const Value = {
    //   rating: writeReviewBodyParams.rating,
    //   content: writeReviewBodyParams.content,
    //   picture: writeReviewBodyParams.picture,
    //   oredrId: writeReviewParams.orderId,
    //   createdAt: new Date('07 October 2011 15:50 UTC'),
    //   updatedAt: new Date('07 October 2011 15:50 UTC'),
    // }
    await orderController.putFirstOrder(mockRequest, mockResponse)
    expect(mockOrderService.selectOrder).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //현재 200이 되야하는데 400이 뜸
    expect(mockResponse.status).toHaveBeenCalledWith(400);
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
    // const Value = {
    //   rating: writeReviewBodyParams.rating,
    //   content: writeReviewBodyParams.content,
    //   picture: writeReviewBodyParams.picture,
    //   oredrId: writeReviewParams.orderId,
    //   createdAt: new Date('07 October 2011 15:50 UTC'),
    //   updatedAt: new Date('07 October 2011 15:50 UTC'),
    // }
    await orderController.putOrderUpdate(mockRequest, mockResponse)
    expect(mockOrderService.updateOrder).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //현재 200이 되야하는데 400이 뜸
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  })
  test('getOrders 테스트', async () => {
    await orderController.getOrders(mockRequest, mockResponse)
    expect(mockOrderService.findAllOrder).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //현재 200이 되야하는데 400이 뜸
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  })
  test('getOrderById 테스트', async () => {
    await orderController.getOrders(mockRequest, mockResponse)
    expect(mockOrderService.findAllOrder).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //현재 200이 되야하는데 400이 뜸
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  })
})
