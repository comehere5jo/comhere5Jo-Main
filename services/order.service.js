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

const OrderRepository = require('../repositories/order.repository');
const { Orders } = require('../models');

class OrderService {
  orderRepository = new OrderRepository();

  findAllOrder = async () => {
    const allOrder = await this.orderRepository.findAllOrder();

    allOrder.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allOrder.map(order => {
      return {
        phone_number: order.phone_number,
        address: order.address,
        cloth_type: order.cloth_type,
        picture: order.picture,
        requests: order.requests,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      };
    });
  };


    createOrder = async (phone_number, address, cloth_type, picture, requests, status) => {
    const createOrderData = await this.orderRepository.createOrder(
      phone_number, address, cloth_type, picture, requests, status);

    return {
      phone_number: createOrderData.phone_number,
      address: createOrderData.address,
      cloth_type: createOrderData.cloth_type,
      picture: createOrderData.picture,
      requests: createOrderData.requests,
      status: createOrderData.status
    };
  }






}


module.exports = OrderService;