// 컨트롤러는 들어오는 클라이언트 요청을 받고 서비스에 전달한다.
// 서비스에서 작업을 마친 데이터를 받아 클라이언트에게 응답한다.
// Controller에는 데이터를 가공하는 등의 비즈니스 로직을 추가하면 안된다.
const OrderService = require('../services/order.service');

class OrdersController {
  orderService = new OrderService();

  getOrders = async (req, res, next) => {
    const orders = await this.orderService.findAllOrder();

    // res.status(200).json({ data: orders });
    return res.status(200).render('../views/orderHistory.ejs', { data: orders });
  };


  getOrderById = async (req, res, next) => {
    const { orderId } = req.params;

    const orderById = await this.orderService.findOrderById(orderId);
    res.status(200).json({ data: orderById });
  };



  createOrder = async (req, res, next) => {
    const { customerId } = req.params;
    const { phoneNumber, address, clothType, picture, requests } = req.body;
    console.log(req.body);

    const createOrderData = await this.orderService.createOrder(
      phoneNumber,
      address,
      clothType,
      picture,
      requests
    );

    // res.status(201).json({ data: createOrderData });
    res.status(200).render('../views/order.ejs');
    //res.redirect('../views/order.ejs');  필요하지않다.
  };


  controller = async (req, res, next) => {
    res.status(200).render('../views/order.ejs');
  }
}

module.exports = OrdersController;