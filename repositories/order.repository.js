// 🥫 data Access Layer
// 데이터 액세스 계층은 쿼리를 수행하여 데이터베이스와 상호 작용합니다.
// 제가 사용하고 있는 Sequelize는 Data Access Layer의 역할의 일부를 대체해줍니다.
// sequelize를 사용하지 않으면 아래와 같이 data Access Layer를 담당하는 파일에 쿼리문을
// 모아서 필요할 때 service 계층에서 호출해서 사용합니다.

// const { Order } = require('../models');
// const { Op } = require('sequelize')
// const { Manager } = require('../models');
class OrderRepository {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }


  findAllOrder = async () => {
    const orders = await this.orderModel.findAll();
    return orders;
  };

  findAllOrderStatus0 = async () => {
    const orders = await this.orderModel.findAll({
      where: {
        status: '0'
      }
    });
    return orders;
  };
  // statusFind = async (id) => {
  //   const status = await Order.findAll({
  //     // attributes: ['status'],
  //     where: { id },
  //   })
  //   console.log('aaa', status)
  //   return status;
  // }
  createOrder = async (phone_number, address, cloth_type, picture, requests, status) => {
    const createOrderData = await this.orderModel.create(
      {
        phone_number,
        address,
        cloth_type,
        picture,
        requests,
        status
      }
    );

    return createOrderData;
  };

  updateOrder = async (id, phone_number, address, cloth_type, picture, requests, status) => {
    const updateOrder = await this.orderModel.update(
      {
        phone_number,
        address,
        cloth_type,
        picture,
        requests,
        status
      }, { where: { id } }
    );

    return updateOrder;
  };

  deleteOrder = async (id) => {
    const deleteOrder = await this.orderModel.destroy(
      { where: { id } }
    );

    return deleteOrder;
  };

  managerSelect = async (managerId) => {
    const manager = await this.orderModel.findAll({
      where: { managerId: managerId }
    })
    return manager;
  }
  selectOrder = async (orderId) => {
    const orders = await this.orderModel.findAll({
      where: { id:orderId}
      
    });
    console.log('오더아이디 비교',orders)
    return orders;
  }

  statusUpdate = async (new_status, orderId) => {
    const statusUpdate = await this.orderModel.update({
      status: new_status
    },
      { where: { id: orderId } })
    return statusUpdate
  }
  // pointUpdate = async(point,managerId) => {
  //   const pointUpdate = await Manager.update({
  //     point
  //   },{
  //     where: {id:managerId}
  //   })
  //   return pointUpdate
  // }
}

module.exports = OrderRepository;