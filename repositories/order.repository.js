// 🥫 data Access Layer
// 데이터 액세스 계층은 쿼리를 수행하여 데이터베이스와 상호 작용합니다.
// 제가 사용하고 있는 Sequelize는 Data Access Layer의 역할의 일부를 대체해줍니다.
// sequelize를 사용하지 않으면 아래와 같이 data Access Layer를 담당하는 파일에 쿼리문을
// 모아서 필요할 때 service 계층에서 호출해서 사용합니다.

// const { Orders } = require('../models');


class OrderRepository {
  constructor(orderModel) {
    this.orderModle = orderModel;
  }


  findAllOrder = async () => {
    const orders = await this.orderModle.findAll();
    return orders;
  };

  createOrder = async (phone_number, address, cloth_type, picture, requests, status) => {
    const createOrderData = await this.orderModle.create(
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

  updateOrder = async (orderId, phone_number, address, cloth_type, picture, requests, status) => {
    const updateOrder = await this.orderModle.update(
      {
        phone_number,
        address,
        cloth_type,
        picture,
        requests,
        status
      }, { where: { orderId } }
    );

    return updateOrder;
  };

  deleteOrder = async (orderId) => {
    const deleteOrder = await this.orderModle.destroy(
      { where: { orderId } }
    );

    return deleteOrder;
  };


}


module.exports = OrderRepository;