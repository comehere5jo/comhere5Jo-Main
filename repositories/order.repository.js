// 🥫 data Access Layer
// 데이터 액세스 계층은 쿼리를 수행하여 데이터베이스와 상호 작용합니다.
// 제가 사용하고 있는 Sequelize는 Data Access Layer의 역할의 일부를 대체해줍니다.
// sequelize를 사용하지 않으면 아래와 같이 data Access Layer를 담당하는 파일에 쿼리문을
// 모아서 필요할 때 service 계층에서 호출해서 사용합니다.

const { Order } = require('../models');
const { Op } = require('sequelize')
const { Manager } = require('../models');
class OrderRepository {
  // constructor(orderModel) {
  //   this.orderModle = orderModel;
  // }


  findAllOrder = async () => {
    const orders = await Order.findAll();
    return orders;
  };

  createOrder = async (phone_number, address, cloth_type, picture, requests, status) => {
    const createOrderData = await Order.create(
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
    const updateOrder = await Order.update(
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
    const deleteOrder = await Order.destroy(
      { where: { id } }
    );

    return deleteOrder;
  };
  managerSelect = async (managerId) => {
    const manager = await Order.findAll({
      where: { managerId: managerId }
    })
  }
  selectOrder = async (id) => {
    const orders = await Order.findAll({
      where: { id }
    });
    return orders;
  }
  
  statusUpdate = async (new_status,orderId) => {
    const statusUpdate = await Order.update({
      status: new_status
    },
    {where:{id:orderId}})
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