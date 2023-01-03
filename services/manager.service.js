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

const ReviewRepository = require('../repositories/review.repository');
const ManagerRepository = require('../repositories/manager.repository');
const OrderRepository = require('../repositories/order.repository');

const { Manager, Review, Order } = require('../models/index.js');
// 서비스 계층은 나머지 애플리케이션에서 모든 비즈니스 로직을 캡슐화하고 추상화합니다.
class ManagerService {
    managerRepository = new ManagerRepository(Manager);
    orderRepository = new OrderRepository(Order);
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
      //내 가게 리뷰보기, 추후 토큰에서 managerId 가져와야함?
    getMyOrderReview = async (managerId) => {
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
};










module.exports = ManagerService;
