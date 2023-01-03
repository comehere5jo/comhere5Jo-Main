// 🧀 service
// 서비스 계층은 나머지 애플리케이션에서 모든 비즈니스 로직을 캡슐화하고 추상화합니다.

// ⭕ Service Layer Sould.

// 비즈니스 로직 포함
// 데이터 액세스 계층을 활용하여 데이터베이스와 상호 작용
// controller 계층에 전달할 데이터 리턴
// ❌ Service Layer Sould Not.

// req , res 활용
// 클라이언트에 대한 응답 처리
// 데이터베이스와 직접 상호 작용

const ManagerRepository = require('../repositories/manager.repository');
const OrderRepository = require('../repositories/order.repository');
const ReviewRepository = require('../repositories/review.repository');
const { Manager, Review, Order } = require('../models');


class ManagerService {
  constructor(){
    this.managerRepository = new ManagerRepository(Manager)
    this.orderRepository = new OrderRepository(Order)
    this.reviewRepository = new ReviewRepository(Review)
  }
    //가져올때 0이 아닌것들 다 제외 (0만 불러오면 됨)
    getOrder = async () => {
        const getLaundry = await this.orderRepository.findAllOrderStatus0();
        console.log("getLaundry.service",getLaundry)
      return getLaundry.map((laundry)=> {
        return {
          address: laundry.address,
          clothType: laundry.clothType,
          phoneNumber: laundry.phoneNumber,
          picture: laundry.picture,
          requests: laundry.requests,
          status: laundry.status,
          createdAt: laundry.createdAt
        };
      })
      };
      //주문 1건에 대한 리뷰 보기
      reviewRepository = new ReviewRepository(Review);
    getOrderReview = async (orderId) => {
        const getOrderReview = await this.reviewRepository.findReviewOrderId(orderId);
        return {   
            orderId: getOrderReview.orderId,
            createdAt:getOrderReview.createdAt,
            comment: getOrderReview.comment,
            content: getOrderReview.content,
            rating: getOrderReview.rating,
            status: getOrderReview.status
          };
    }

    getMyOrderReview = async (managerId) => {
      managerId = 1;
      const getOrderReview = await this.reviewRepository.findReviewManagerId(managerId);
      return getOrderReview.map((order)=> {
      return {   
          orderId: order.orderId,
          createdAt:order.createdAt,
          comment: order.comment,
          content: order.content,
          rating: order.rating,
          status: order.status
        };
      })
  }
  getMyPoint = async (id) => {
    id = 1;
    const getMyPoint = await this.managerRepository.getMyPoint(id);
    return {   
      point: getMyPoint.point,
      };
    
}

findCustomerOreder = async () => {
  const customerOrder = await this.orderRepository.findAllOrder()

  customerOrder.sort((a, b) => {
    return b.createdAt - a.createdAt
  });

  return customerOrder.map((customer) => {
    return {
      id: customer.id,
      customerId: customer.customerId,
      phoneNumber: customer.phoneNumber,
      address: customer.address,
      clothType: customer.clothType,
      picture: customer.picture,
      requests: customer.requests,
      status: customer.status
    }
  })
}
selectOrder = async (orderId, managerId) => {
  const selectOrder = await this.orderRepository.selectOrder(orderId)
  let status = await this.orderRepository.statusFind(orderId)
  
  console.log('스테이터스',status)
  console.log('1234',selectOrder[0].managerId )
  console.log('스테이터스111',status[0].status)
  console.log('스테이터스참',selectOrder[0].managerId === 0)
  console.log('참?',  1 < Number(status[0].status) < 4)
  console.log("내눈이 정상인가",Number(status[0].status))
  if (!selectOrder){
    return console.log("없습니다.")
  }
  if(selectOrder[0].managerId === 0 &&  1< status[0].status <4){
   return console.log("이미 진행중")
  }
  let new_status = status[0].status + 1
  console.log("aaaa",status)
  console.log("vvvv",new_status)
  await this.orderRepository.statusUpdate(new_status, orderId)

  const updateOreder = await this.orderRepository.selectOrder(managerId)
  return updateOreder.map((order) =>{
  return {
    id: order.id,
    customerId: order.customerId,
    phoneNumber: order.phoneNumber,
    address: order.address,
    clothType: order.clothType,
    picture: order.picture,
    requests: order.requests,
    status:order.status
  }
})
}

updateOrder = async (orderId, managerId, status) => {
  const myOrder = await this.orderRepository.findAllOrder(orderId,status)
  try {
    if (myOrder.status === 1) {
      status = status + 1
      await this.orderRepository.updateOrder(managerId, status)
      const updateOrder = await this.orderRepository.startOrder(orderId,status)
      return updateOrder.map((order) =>{
        return {
          id: order.id,
          customerId: order.customerId,
          phoneNumber: order.phoneNumber,
          address: order.address,
          clothType: order.clothType,
          picture: order.picture,
          requests: order.requests,
          status:order.status
        }
      })
    }
    if (myOrder.status === 2) {
      status = status + 1
      await this.orderRepository.updateOrder(managerId, status)
      const updateOrder = await this.orderRepository.startOrder(orderId,status)
      return updateOrder.map((order) =>{
        return {
          id: order.id,
          customerId: order.customerId,
          phoneNumber: order.phoneNumber,
          address: order.address,
          clothType: order.clothType,
          picture: order.picture,
          requests: order.requests,
          status:order.status
        }
      })
    }
    if (myOrder.status === 3) {
      status = status + 1
      await this.orderRepository.updateOrder(managerId, status)
      const updateOrder = await this.orderRepository.startOrder(orderId,status)
      return updateOrder.map((order) =>{
        return {
          id: order.id,
          customerId: order.customerId,
          phoneNumber: order.phoneNumber,
          address: order.address,
          clothType: order.clothType,
          picture: order.picture,
          requests: order.requests,
          status:order.status
        }
      })
    }
    if (myOrder.status === 4) {
      await this.managerRepository.update({
        point: +10000
      })
      const updateOrder = await this.orderRepository.startOrder(orderId,status)
      return updateOrder.map((order) =>{
        return {
          id: order.id,
          customerId: order.customerId,
          phoneNumber: order.phoneNumber,
          address: order.address,
          clothType: order.clothType,
          picture: order.picture,
          requests: order.requests,
          status:order.status
        }
      })
    }
    const updateOrder = await this.orderRepository.startOrder(orderId,status)
    return updateOrder.map((order) =>{
      return {
        id: order.id,
        customerId: order.customerId,
        phoneNumber: order.phoneNumber,
        address: order.address,
        clothType: order.clothType,
        picture: order.picture,
        requests: order.requests,
        status:order.status
      }
    })
  }
  catch(err) {
    console.log('error',err)
  }

}

};












module.exports = ManagerService;