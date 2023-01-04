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
const { Order } = require('../models');

const ManagerRepository = require('../repositories/manager.repository');
const { Manager }  = require('../models');

class OrderService {
  orderRepository = new OrderRepository(Order);
  managerRepository = new ManagerRepository(Manager);

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


  findAllOrder = async () => {
    const allOrder = await this.orderRepository.findAllOrder();

    allOrder.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allOrder.map(order => {
      return {
        phoneNumber: order.phoneNumber,
        address: order.address,
        clothType: order.clothType,
        picture: order.picture,
        requests: order.requests,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      };
    });
  };

  findOrderById = async (orderId) => {

    const byIdOrder = await this.orderRepository.findOrderById(orderId);
      return {
        orderId: byIdOrder.id,
        phoneNumber: byIdOrder.phoneNumber,
        address: byIdOrder.address,
        clothType: byIdOrder.clothType,
        picture: byIdOrder.picture,
        requests: byIdOrder.requests,
        createdAt: byIdOrder.createdAt,
        updatedAt: byIdOrder.updatedAt
      };

  }


    createOrder = async (phoneNumber, address, clothType, picture, requests, status) => {
    const createOrderData = await this.orderRepository.createOrder(
      phoneNumber, address, clothType, picture, requests, status);

    return {
      phoneNumber: createOrderData.phoneNumber,
      address: createOrderData.address,
      clothType: createOrderData.clothType,
      picture: createOrderData.picture,
      requests: createOrderData.requests,
      status: createOrderData.status
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
  




}


module.exports = OrderService;