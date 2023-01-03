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
    console.log('orderId' ,orderId)
    const selectOrder = await this.orderRepository.selectOrder(orderId)

    // console.log('스테이터스',status)
    console.log('매니저아이디',selectOrder[0].managerId )
    console.log('스테이터스111', selectOrder[0].status)
    console.log('스테이터스참',selectOrder[0].managerId === 0)
    console.log('참?',  1 < Number(selectOrder[0].status) && Number(selectOrder[0].status)< 4)
    // console.log("내눈이 정상인가",Number(status[0].status))
    if (!selectOrder) {
      return console.log("없습니다.")
    }
    if (selectOrder[0].managerId !== 0 && 0 < selectOrder[0].status && Number(selectOrder[0].status) < 4 || selectOrder[0].status>5) {
      return console.log("이미 진행중")
    }
    let new_status = selectOrder[0].status + 1
    // console.log("aaaa",status)
    // console.log("vvvv",new_status)
    await this.orderRepository.statusUpdate(new_status, orderId)
    const updateOreder = await this.orderRepository.selectOrder(orderId)
    return updateOreder.map((order) => {
      return {
        id: order.id,
        customerId: order.customerId,
        phoneNumber: order.phoneNumber,
        address: order.address,
        clothType: order.clothType,
        picture: order.picture,
        requests: order.requests,
        status: order.status
      }
    })
  }

  updateOrder = async (orderId, managerId) => {
    const selectOrder = await this.orderRepository.selectOrder(orderId)
    console.log('현스테이터스',selectOrder[0].status)
    if (selectOrder[0].status === 1) {
      const new_status = selectOrder[0].status + 1
      console.log("추가 스테이터스 2가되어야함", new_status)
      await this.orderRepository.statusUpdate(new_status, orderId)
      const updateOrder = await this.orderRepository.selectOrder(managerId)
      return updateOrder.map((order) => {
        return {
          id: order.id,
          customerId: order.customerId,
          phoneNumber: order.phoneNumber,
          address: order.address,
          clothType: order.clothType,
          picture: order.picture,
          requests: order.requests,
          status: order.status
        }
      })
    }
    if (selectOrder[0].status === 2) {
      const new_status = selectOrder[0].status + 1
      console.log("추가 스테이터스 3이되어야함", new_status)
      await this.orderRepository.statusUpdate(new_status, orderId)
      const updateOrder = await this.orderRepository.selectOrder(managerId)
      return updateOrder.map((order) => {
        return {
          id: order.id,
          customerId: order.customerId,
          phoneNumber: order.phoneNumber,
          address: order.address,
          clothType: order.clothType,
          picture: order.picture,
          requests: order.requests,
          status: order.status
        }
      })
    }
    if (selectOrder[0].status === 3) {
      const new_status = selectOrder[0].status + 1
      console.log("추가 스테이터스 4가되어야함", new_status)
      await this.orderRepository.statusUpdate(new_status, orderId)
      const updateOrder = await this.orderRepository.selectOrder(managerId)
      return updateOrder.map((order) => {
        return {
          id: order.id,
          customerId: order.customerId,
          phoneNumber: order.phoneNumber,
          address: order.address,
          clothType: order.clothType,
          picture: order.picture,
          requests: order.requests,
          status: order.status
        }
      })
    }
    if (selectOrder[0].status === 4) {
      const new_status = selectOrder[0].status + 1
      await this.orderRepository.statusUpdate(new_status, orderId)
      await this.managerRepository.managerPointUpdate(10000, orderId)
      const updateOrder = await this.orderRepository.selectOrder(managerId)
      return updateOrder.map((order) => {
        return {
          id: order.id,
          customerId: order.customerId,
          phoneNumber: order.phoneNumber,
          address: order.address,
          clothType: order.clothType,
          picture: order.picture,
          requests: order.requests,
          status: order.status
        }
      })
    }
    if(selectOrder[0].status>4 || selectOrder[0].status<0){
      return console.log("완료된 주문")
    }
  }
}



module.exports = ManagerService;
