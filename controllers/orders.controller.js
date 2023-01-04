// 컨트롤러는 들어오는 클라이언트 요청을 받고 서비스에 전달한다.
// 서비스에서 작업을 마친 데이터를 받아 클라이언트에게 응답한다.
// Controller에는 데이터를 가공하는 등의 비즈니스 로직을 추가하면 안된다.
const OrderService = require('../services/order.service');

class OrdersController {
  orderService = new OrderService();
  //고객님이 주문
  createOrder = async (req, res, next) => {
    const customerId = req.customer.id;

    const { phoneNumber, address, clothType, picture, requests } = req.body;

    const createOrderData = await this.orderService.createOrder( customerId,
      phoneNumber,
      address,
      clothType,
      picture,
      requests
    );
    console.log('첵첵', createOrderData)

    res.status(201).json({ data: createOrderData });
    // res.status(200).render('../views/order.ejs');
    //res.redirect('../views/order.ejs');  필요하지않다.
  };

  //수락 안된 모든 주문 조회
    //controller에서는 클라이언트에 대한 응답만을 작성하였다.
  getOrder = async (req, res, next) => {
      const getOrder = await this.orderService.getOrder();
      console.log("getOrder.controller",getOrder)
      res.status(200).json({data:getOrder})
  }

  //주문 진행 상태 상관 없이 모든 주문 조회
  getOrders = async (req, res, next) => {
    const orders = await this.orderService.findAllOrder();

    return res.status(200).render('../views/orderHistory.ejs', { data: orders });
  };

  //특정 주문 조회
  getOrderById = async (req, res, next) => {
    const { orderId } = req.params;

    const orderById = await this.orderService.findOrderById(orderId);
    res.status(200).json({ data: orderById });
  };

  //
  getMangers = async (req,res,next) => {
    const managers = await this.orderService.findCustomerOrder()
    console.log("불러올값",managers)
    res.status(200).render('main',{data:managers})
  }

  putFirstOrder = async(req,res,next) => {
    const { managerId } = req.params
    const {orderId} = req.body
    const firstOrder = await this.orderService.selectOrder(orderId, managerId)
    console.log("주문 수락", firstOrder)
    if(!firstOrder){
      return res.status(400).json({errorMessage:"사장님은 이미 주문을 진행중입니다."})
    }
    res.status(200).json({data:firstOrder})
  }

  putOrderUpdate = async(req,res,next) => {
    const { managerId, orderId } = req.params
    const {status} = req.body
    const updateOrder = await this.orderService.updateOrder(orderId, managerId, status)
    console.log('주문현황',updateOrder)
    if(!updateOrder){
      return res.status(400).json({errorMessage:"주문을 이미 완료하셨습니다."})
    }
    res.status(200).json({data:updateOrder})
  }


  controller = async (req, res, next) => {
    res.status(200).render('../views/order.ejs');
  }
}

module.exports = OrdersController;