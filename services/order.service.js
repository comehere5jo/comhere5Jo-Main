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
const {get} = require("axios");

class OrderService {
  orderRepository = new OrderRepository(Order);
  managerRepository = new ManagerRepository(Manager);

  //고객님이 주문(확인완료)
  createOrder = async (customerId, phoneNumber, address, clothType, picture, requests) => {
    try{
      if(!phoneNumber || !address || !clothType || !picture) {
        throw new Error('모든 정보를 입력해주세요.')
      }

      const createOrderData = await this.orderRepository.createOrder(
      customerId, phoneNumber, address, clothType, picture, requests);

    return {
      customerId: createOrderData.customerId,
      phoneNumber: createOrderData.phoneNumber,
      address: createOrderData.address,
      clothType: createOrderData.clothType,
      picture: createOrderData.picture,
      requests: createOrderData.requests,
      status: createOrderData.status
    };
    } catch (error) {
      return error;
    }
  }

  //수락 안 된 모든 주문 조회
  getOrder = async () => {
    try {
      const getLaundry = await this.orderRepository.findAllOrderStatus0();
      if (!getLaundry) {
        throw new Error('수락 안 된 주문이 없습니다.')
      }

      return getLaundry.map((laundry) => {
        return {
          address: laundry.address,
          clothType: laundry.clothType,
          phoneNumber: laundry.phoneNumber,
          picture: laundry.picture,
          requests: laundry.requests,
          status: laundry.status,
          createdAt: laundry.createdAt
        }
      })
    } catch (error) {
      return error;
    }
  }


    //주문 진행 상태 상관 없이 고객님이 주문한 모든 주문 조회(확인완료)
  findMyOrder = async (customerId) => {
    const allOrder = await this.orderRepository.findAllOrder(customerId);

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

    //특정 주문 조회(확인완료)
  findOrderById = async (id) => {
    try{
      const byIdOrder = await this.orderRepository.findOrderById(id);
      if(!byIdOrder){
        throw new Error('주문이 존재하지 않습니다.')
      }
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
    } catch (error) {
      return error;
    }
  }

  // //????
  // findCustomerOrder = async () => {
  //   const customerOrder = await this.orderRepository.findAllOrder()
  //
  //   customerOrder.sort((a, b) => {
  //     return b.createdAt - a.createdAt
  //   });
  //
  //   return customerOrder.map((customer) => {
  //     return {
  //       id: customer.id,
  //       customerId: customer.customerId,
  //       phoneNumber: customer.phoneNumber,
  //       address: customer.address,
  //       clothType: customer.clothType,
  //       picture: customer.picture,
  //       requests: customer.requests,
  //       status: customer.status
  //     }
  //   })
  // }

  //주문 수락(작동오류)
  // selectOrder = async (orderId, managerId) => {
  //   try{
  //     const selectOrder = await this.orderRepository.selectOrder(orderId)
  //     if (!selectOrder) {
  //       return console.log("없습니다.")
  //     }
  //     console.log(selectOrder)
  //
  //     if (selectOrder.managerId === managerId) {
  //       throw new Error('이미 수락하신 주문이 있습니당')
  //     }
  //
  //     if (selectOrder[0].managerId !== 0 && 0 < selectOrder[0].status && Number(selectOrder[0].status) < 4 ) {
  //       return console.log("이미 진행중")
  //     }
  //     let new_status = selectOrder[0].status + 1
  //
  //     await this.orderRepository.statusUpdate(new_status, orderId, managerId)
  //
  //     const updateOrder = await this.orderRepository.selectOrder(orderId)
  //     return updateOrder.map((order) => {
  //       return {
  //         id: order.id,
  //         customerId: order.customerId,
  //         phoneNumber: order.phoneNumber,
  //         address: order.address,
  //         clothType: order.clothType,
  //         picture: order.picture,
  //         requests: order.requests,
  //         status: order.status
  //       }
  //     })
  //   } catch (error) {
  //     return error;
  //   }
  // }

  //사장님이 주문 수락(확인완료)
  acceptOrder = async (orderId, managerId) => {
    try{
      const proceedingOrder = await this.orderRepository.findIfProceedingOrder(managerId);

      if (proceedingOrder) {
        throw new Error('진행 중인 주문이 있습니당.')
      }

      console.log('222222')
      const selectOrder = await this.orderRepository.selectOrder(orderId)
      let new_status = selectOrder[0].status + 1

      await this.orderRepository.statusUpdate(new_status, orderId, managerId)
      const updateOrder = await this.orderRepository.selectOrder(orderId)
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

    } catch(error) {
      return error;
    }
  }

  //주문 진행 상태 변경(확인 완료))
    updateOrder = async (orderId, status) => {
    try{
      const selectOrder = await this.orderRepository.selectOrder(orderId)

      if (selectOrder[0].status === 1) {
        const new_status = selectOrder[0].status + 1
        console.log("추가 스테이터스 2가되어야함", new_status)
        await this.orderRepository.statusUpdate(new_status, orderId)
        const updateOrder = await this.orderRepository.selectOrder(orderId)
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
        const updateOrder = await this.orderRepository.selectOrder(orderId)
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
        const updateOrder = await this.orderRepository.selectOrder(orderId)
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
        const updateOrder = await this.orderRepository.selectOrder(orderId)
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
      if (selectOrder[0].status > 4 || selectOrder[0].status <= 0) {
        throw new Error('완료되었거나 수락하지 않은 주문입니다.')
      }
    } catch (error) {
      return error;
    }
  };

}


module.exports = OrderService;