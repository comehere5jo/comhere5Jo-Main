// 컨트롤러는 들어오는 클라이언트 요청을 받고 서비스에 전달한다.
// 서비스에서 작업을 마친 데이터를 받아 클라이언트에게 응답한다.
// Controller에는 데이터를 가공하는 등의 비즈니스 로직을 추가하면 안된다.
const OrderService = require('../services/order.service');
const CustomerService = require('../services/customer.service'); // Front: 마이페이지에서 고객 정보(포인트 조회, 이름 등) 필요하기 때문에 가져온다. 
const ManagerService = require('../services/manager.service'); // 230106 Front: 마이페이지에서 고객 정보(포인트 조회, 이름 등) 필요하기 때문에 가져온다.

class OrdersController {
  orderService = new OrderService();
  customerService = new CustomerService(); // Front: 마이페이지에서 고객 정보(포인트 조회, 이름 등) 필요하기 때문에 가져온다. 
  managerService = new ManagerService(); // 230106 Front: 마이페이지에서 고객 정보(포인트 조회, 이름 등) 필요하기 때문에 가져온다. 

  //고객님이 주문(확인완료)
  createOrder = async (req, res, next) => {
    try{
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

      if(createOrderData.message === '모든 정보를 입력해주세요.'){
        throw createOrderData;
      }

    res.status(201).json({ data: createOrderData });
    // res.status(200).render('../views/order.ejs');
    //res.redirect('../views/order.ejs');  필요하지않다.
    } catch (error) {
      console.error(error)
      if (error.message === '모든 정보를 입력해주세요.'){
        return res.status(412).json({message: error.message})
      } else {
        return res.status(400).json({message: '주문 실패'})
      }
    }
  };

  //수락 안된 모든 주문 조회(확인완료)
    //controller에서는 클라이언트에 대한 응답만을 작성하였다.
  getOrder = async (req, res, next) => {
    try{
      if(req.manager && req.manager.id){
        const getOrder = await this.orderService.getOrder();
        res.status(200).json({data:getOrder})
      } else {
        throw new Error('사장님만 이용하실 수 있는 서비스입니다.')
      }
    } catch (error) {
      console.error(error)
      if(error.message === '사장님만 이용하실 수 있는 서비스입니다.'){
        return res.status(400).json({error: error.message})
      }else{
        return res.status(400).json({error: '주문 내역 조회 실패'})
      }
    }
  }


  // Front: 프론트용 수락 안된 모든 주문 조회 (for manager)
    getOrderForOrderlist = async (req, res, next) => {


      // 매니저 로그인이 안되서, 화면 구경용으로 보세요.
      // 프론트 매니저로그인 구동시, 아래 try catch 구문으로 주석풀어서 쓰면 됩니다. 
      // const getOrderForManager = await this.orderService.getOrder();         
      // return res.status(200).render('../views/orderlist.ejs', { orders : getOrderForManager });


      try{
        if(req.manager && req.manager.id){
          const getOrderForManager = await this.orderService.getOrder();
          
          return res.status(200).render('../views/orderlist.ejs', { orders : getOrderForManager });


        } else {
          throw new Error('사장님만 이용하실 수 있는 서비스입니다.')
        }
      } catch (error) {
        console.error(error)
        if(error.message === '사장님만 이용하실 수 있는 서비스입니다.'){
          return res.status(400).json({error: error.message})
        }else{
          return res.status(400).json({error: '주문 내역 조회 실패'})
        }
      }
    }
  









  //주문 진행 상태 상관 없이 고객님이 주문한 모든 주문 조회(확인완료)
  getMyOrders = async (req, res, next) => {
    try {
      if(req.customer && req.customer.id){
        const customerId = req.customer.id;
      const orders = await this.orderService.findMyOrder(customerId);
      console.log(orders)
    return res.status(200).render('../views/orderHistory.ejs', { data: orders });
      } else {
        throw new Error('고객님만 이용하실 수 있는 서비스입니다.')
      }
    } catch (error) {
      console.error(error)
      return res.status(400).json({message: error.message})
    }
  };

  //특정 주문 조회(확인 완료)
  getOrderById = async (req, res, next) => {
    try{
      const id = req.params.orderId;
      const orderById = await this.orderService.findOrderById(id);

      console.log('컨트롤', orderById);
      const token = req.headers.cookie.split('=')[1];  // Front: 연결 지점

      if(typeof orderById.message !== 'undefined'){
        throw orderById;
      }

      return res.status(200).render('../views/orderview.ejs', { token: token, data: orderById }); // Front: 연결 지점
    } catch (error) {
      console.error(error);
      if(error.message === '주문이 존재하지 않습니다.'){
        return res.status(404).json({message: error.message})
      } else{
        return res.status(400).json({message: '주문 조회 실패'})
      }
    }
  };




  // Front : 고객 마이페이지용 컨트롤러 만들기 
  getMypage = async (req, res, next) => {
    const customerId = req.customer.id;
    // console.log("컨트롤러", customerId);

    const orderByCustomer = await this.orderService.findOrderByCustomer(customerId);
    const { id } = req.customer;
    // console.log("고객아이디", id);
    const customerInfo = await this.customerService.findByPk(id)

    // res.status(200).json({ data: orderByCustomer });
    // const data = res.locals;
    const token = req.headers.cookie.split('=')[1];
    // res.locals.token = token;

    // console.log("쿠키데이타받아보자", token);
    // console.log("컨트롤러", orderByCustomer);
    console.log("고객정보받아보자", customerInfo)

    return res.status(200).render('../views/me.ejs', { token: token, data: orderByCustomer, customerInfo: customerInfo });
  };


  // 230106 Front : 사장님 마이페이지용 컨트롤러 만들기 
  getMypageManager = async (req, res, next) => {

    // const managerId = 1; 
    // const id = 1; 
    const managerId = req.manager.id;
    console.log("컨트롤러", managerId);

    const orderByManager = await this.orderService.findOrderByManager(managerId);
    const { id } = req.manager;
    console.log("고객아이디", id);
    const managerInfo = await this.managerService.findByPk(id)

    // res.status(200).json({ data: orderByCustomer });
    // const data = res.locals;
    const token = req.headers.cookie.split('=')[1];
    // res.locals.token = token;

    // console.log("쿠키데이타받아보자", token);
    // console.log("컨트롤러", orderByCustomer);
    console.log("매니저 주문정보받아보자", managerInfo);

    return res.status(200).render('../views/meManager.ejs', { token: token, data: orderByManager, managerInfo: managerInfo });
  };















  // //????
  // getManagers = async (req,res,next) => {
  //   const managers = await this.orderService.findCustomerOrder()
  //   console.log("불러올값",managers)
  //   res.status(200).render('main',{data:managers})
  // }

  //주문 수락(확인완료)
  putFirstOrder = async(req,res,next) => {
    try{
      const managerId = req.manager.id
      const {orderId} = req.params
      const firstOrder = await this.orderService.acceptOrder(orderId, managerId)
        console.log('333333', firstOrder)

      if (typeof firstOrder.message !== "undefined"){
        throw firstOrder;
      }
      res.status(200).json({data:firstOrder})
    } catch (error) {
      console.error(error);
      if(error.message === '진행 중인 주문이 있습니당.'){
        return res.status(400).send({message: error.message});
      } else {
        return res.status(400).send({message: '주문 수락 실패'});
      }
    }
  }

  //주문 진행상태 변경(확인 완료))
  putOrderUpdate = async(req,res,next) => {
    try{
      const { orderId } = req.params;
      const updateOrder = await this.orderService.updateOrder(orderId);

      if(typeof updateOrder.message !== 'undefined'){
        throw updateOrder;
      }
      res.status(200).json({data:updateOrder});
    } catch (error) {
        console.error(error);
        if(error.message === "완료되었거나 수락하지 않은 주문입니다."){
          return res.status(409).json({errorMessage:error.message})
        } else {
          return res.status(400).json({errorMessage: "주문 진행 상태 변경 실패"})
        }
    }
  };


  controller = async (req, res, next) => {
    res.status(200).render('../views/order.ejs');
  }
}

module.exports = OrdersController;