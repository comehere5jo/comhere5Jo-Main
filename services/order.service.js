// ๐ง service
// ์๋น์ค ๊ณ์ธต์ ๋๋จธ์ง ์ ํ๋ฆฌ์ผ์ด์์์ ๋ชจ๋  ๋น์ฆ๋์ค ๋ก์ง์ ์บก์ํํ๊ณ  ์ถ์ํํฉ๋๋ค.

// โญ Service Layer Sould.

// ๋น์ฆ๋์ค ๋ก์ง ํฌํจ
// ๋ฐ์ดํฐ ์ก์ธ์ค ๊ณ์ธต์ ํ์ฉํ์ฌ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์ํธ ์์ฉ
// controller ๊ณ์ธต์ ์ ๋ฌํ  ๋ฐ์ดํฐ ๋ฆฌํด
// โ Service Layer Sould Not.

// req , res ํ์ฉ
// ํด๋ผ์ด์ธํธ์ ๋ํ ์๋ต ์ฒ๋ฆฌ
// ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์ง์  ์ํธ ์์ฉ

const OrderRepository = require('../repositories/order.repository');
const { Order } = require('../models');

const ManagerRepository = require('../repositories/manager.repository');
const { Manager }  = require('../models');
const {get} = require("axios");

class OrderService {
  orderRepository = new OrderRepository(Order);
  managerRepository = new ManagerRepository(Manager);

  //๊ณ ๊ฐ๋์ด ์ฃผ๋ฌธ(ํ์ธ์๋ฃ)
  createOrder = async (customerId, phoneNumber, address, clothType, picture, requests) => {
    try{
      if(!phoneNumber || !address || !clothType) {
        throw new Error('๋ชจ๋  ์ ๋ณด๋ฅผ ์๋ ฅํด์ฃผ์ธ์.')
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

  //์๋ฝ ์ ๋ ๋ชจ๋  ์ฃผ๋ฌธ ์กฐํ
  getOrder = async () => {
    try {
      const getLaundry = await this.orderRepository.findAllOrderStatus0();
      if (!getLaundry) {
        throw new Error('์๋ฝ ์ ๋ ์ฃผ๋ฌธ์ด ์์ต๋๋ค.')
      }

      return getLaundry.map((laundry) => {
        return {
          id: laundry.id,  // :Front์ฉ ์ฃผ๋ฌธ๋ฒํธ ์๋ ฅํ์
          address: laundry.address,
          clothType: laundry.clothType,
          phoneNumber: laundry.phoneNumber,
          picture: laundry.picture,
          requests: laundry.requests,
          status: laundry.status,
          createdAt: laundry.createdAt,
          updatedAt: laundry.updatedAt, // :Front์ฉ ์๊ฐ์๋ ฅ ํ์ 
        }
      })
    } catch (error) {
      return error;
    }
  }


    //์ฃผ๋ฌธ ์งํ ์ํ ์๊ด ์์ด ๊ณ ๊ฐ๋์ด ์ฃผ๋ฌธํ ๋ชจ๋  ์ฃผ๋ฌธ ์กฐํ(ํ์ธ์๋ฃ)
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

    //ํน์  ์ฃผ๋ฌธ ์กฐํ(ํ์ธ์๋ฃ)
  findOrderById = async (id) => {
    try{
      const byIdOrder = await this.orderRepository.findOrderById(id);
      if(!byIdOrder){
        throw new Error('์ฃผ๋ฌธ์ด ์กด์ฌํ์ง ์์ต๋๋ค.')
      }
      return {
        orderId: byIdOrder.id,
        phoneNumber: byIdOrder.phoneNumber,
        address: byIdOrder.address,
        clothType: byIdOrder.clothType,
        picture: byIdOrder.picture,
        requests: byIdOrder.requests,
        createdAt: byIdOrder.createdAt,
        updatedAt: byIdOrder.updatedAt,
        status:byIdOrder.status, // Front: status ํ์ํญ๋ชฉ์ด์ฌ์ ์ฝ์  
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

  //์ฃผ๋ฌธ ์๋ฝ(์๋์ค๋ฅ)
  // selectOrder = async (orderId, managerId) => {
  //   try{
  //     const selectOrder = await this.orderRepository.selectOrder(orderId)
  //     if (!selectOrder) {
  //       return console.log("์์ต๋๋ค.")
  //     }
  //     console.log(selectOrder)
  //
  //     if (selectOrder.managerId === managerId) {
  //       throw new Error('์ด๋ฏธ ์๋ฝํ์  ์ฃผ๋ฌธ์ด ์์ต๋๋น')
  //     }
  //
  //     if (selectOrder[0].managerId !== 0 && 0 < selectOrder[0].status && Number(selectOrder[0].status) < 4 ) {
  //       return console.log("์ด๋ฏธ ์งํ์ค")
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



  // Front: ๋ง์ดํ์ด์ง์ฉ ๊ณ ๊ฐ ๊ฒ์
  findOrderByCustomer = async (customerId) => {

    // console.log("์๋น์ค", customerId);

    const byCustomerOrder = await this.orderRepository.findOrderByCustomer(customerId);
    console.log("์๋น์ค", byCustomerOrder); 

    return byCustomerOrder;

  }
  

    // 230106 Front: ๋ง์ดํ์ด์ง์ฉ ์ฌ์ฅ๋ ์ฃผ๋ฌธ ๊ฒ์
    findOrderByManager = async (managerId) => {

      // console.log("์๋น์ค", customerId);

      const byManagerOrder = await this.orderRepository.findOrderByManager(managerId);
      console.log("์๋น์ค", byManagerOrder); 

      return byManagerOrder;

    }



  // Front: ๋ง์ดํ์ด์ง์ฉ ๊ณ ๊ฐ ๊ฒ์
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


 





  //์ฌ์ฅ๋์ด ์ฃผ๋ฌธ ์๋ฝ(ํ์ธ์๋ฃ)
  acceptOrder = async (orderId, managerId) => {
    try{
      const proceedingOrder = await this.orderRepository.findIfProceedingOrder(managerId);

      if (proceedingOrder.length) {
        throw new Error('์งํ ์ค์ธ ์ฃผ๋ฌธ์ด ์์ต๋๋น.')
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

  //์ฃผ๋ฌธ ์งํ ์ํ ๋ณ๊ฒฝ(ํ์ธ ์๋ฃ))
    updateOrder = async (orderId, status) => {
    try{
      const selectOrder = await this.orderRepository.selectOrder(orderId)
      console.log('ํ์คํ์ดํฐ์ค', selectOrder[0].status)
      if (selectOrder[0].status === 1 || selectOrder[0].status === 2 || selectOrder[0].status === 3 || selectOrder[0].status === 4 ) {
        const new_status = selectOrder[0].status + 1
        console.log("์ถ๊ฐ ์คํ์ดํฐ์ค ", new_status)
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
      else{
        throw new Error('์๋ฃ๋์๊ฑฐ๋ ์๋ฝํ์ง ์์ ์ฃผ๋ฌธ์๋๋ค.')
      }
    } catch (error) {
      return error;
    }
  };

}


module.exports = OrderService;