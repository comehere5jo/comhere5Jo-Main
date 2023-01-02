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
const { Manager } = require('../models/index.js');
const { Oreder } = require('../models/order');
const { Review } = require('../models/review');



class ManagerService {
  managerRepository = new ManagerRepository(Manager)
  orderRepository = new OrderRepository(Oreder)
  reviewRepository = new ReviewRepository(Review)

  findCustomerOreder = async () => {
    const customerOrder = await this.orderRepository.findAllOrder()

    customerOrder.sort((a, b) => {
      return b.createdAt - a.createdAt
    });

    return customerOrder.map((customer) => {
      return {
        id: post.id,
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
  findMyReview = async (managerId) => {
    const findReview = await this.reviewRepository.findAllReview({
      where: { managerId }
    })
    return {
      id: findReview.id,
      orderId:findReview.orderId,
      customerId:findReview.customerId,
      managerId:findReview.managerId,
      rating:findReview.rating,
      content:findReview.content,
      picture:findReview.picture,
      comment:findReview.comment,
      status:findReview.status,
    }

  }
}



module.exports = ManagerService;
