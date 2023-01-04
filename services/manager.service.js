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
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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

findCustomerOrder = async () => {
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

    console.log('1234', selectOrder[0].managerId)
    console.log('스테이터스참', selectOrder[0].managerId === 0)

    if (!selectOrder) {
      return console.log("없습니다.")
    }
    if (selectOrder[0].managerId !== 0 && 0 < selectOrder[0].status && Number(selectOrder[0].status) < 4 || selectOrder[0].status > 5) {
      return console.log("이미 진행중")
    }
    let new_status = selectOrder[0].status + 1
    console.log("vvvv", new_status)
    await this.orderRepository.statusUpdate(new_status, orderId)

    const updateOreder = await this.orderRepository.selectOrder(managerId)
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
    console.log('현스테이터스', selectOrder[0].status)
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
    if (selectOrder[0].status > 4 || selectOrder[0].status < 0) {
      return console.log("완료된 주문")
    }
  };

  managerSignup = async (loginId, loginPw, confirmPw, name) => {
    const idReg = /^[a-zA-Z0-9]{3,}$/;
    try {
      if (!idReg.test(loginId)) {
        throw new Error('id 형식 틀림');
        return;
      }
      if (loginPw.length < 4) {
        throw new Error('pw 형식 틀림');
        return;
      }
      if (loginPw !== confirmPw) {
        throw new Error('pw 일치 안함');
        return;
      }

      if (loginPw.includes(loginId)) {
        throw new Error('닉네임 비번 같음');
        return;
      }
      const duplicateId = await this.managerRepository.findCertainManager(
        loginId,
      );
      if (duplicateId) {
        throw new Error('닉네임 중복됨');
        return;
      }
      const encryptedPassword = await bcrypt.hash(loginPw, saltRounds);
      await this.managerRepository.createManager(
        loginId,
        encryptedPassword,
        name,
      );
      return true;
    } catch (error) {
      return error;
    }
  };

  managerSignin = async (loginId, loginPw) => {
    try {
      const manager = await this.managerRepository.findCertainManager(
        loginId,
      );

      const check = await bcrypt.compare(loginPw, manager.loginPw);

      if (manager) {
        if (check) {
          const token = jwt.sign(
            { loginId: loginId, id: manager.id },
            process.env.JWT_ACCESS_SECRET,
            {
              expiresIn: '1h',
            },
          );
          return token;
        }
      } else {
        throw new Error('id나 비번 확인해');
      }
      return;
    } catch (error) {
      return error;
    }
  };
}
module.exports = ManagerService;