// 🥫 data Access Layer
// 데이터 액세스 계층은 쿼리를 수행하여 데이터베이스와 상호 작용합니다.
// 제가 사용하고 있는 Sequelize는 Data Access Layer의 역할의 일부를 대체해줍니다.
// sequelize를 사용하지 않으면 아래와 같이 data Access Layer를 담당하는 파일에 쿼리문을
// 모아서 필요할 때 service 계층에서 호출해서 사용합니다.
const { Op } = require('sequelize')

class OrderRepository {
  constructor(orderModel) {
    this.orderModel =orderModel;
 }


    //고객님이 신청한 모든 주문내역 조회
  findAllOrder = async (customerId) => {
      try{
          const orders = await this.orderModel.findAll(
                {where: {
                    customerId
                    }}
            );
            return orders;
      } catch (error){
          return error;
      }
  };

//수락 안된 모든 주문 조회
  findAllOrderStatus0 = async () => {
      try{
          const orders = await this.orderModel.findAll({
              where: {
                status: '0'
              }
            });
          return orders;
      }catch (error) {
          return error;
      }
  };

  findOrderById = async (id) => {
      try{
          const byIdOrders = await this.orderModel.findByPk(id);
            return byIdOrders;
      } catch (error){
          return error;
      }
  };

  createOrder = async (customerId, phoneNumber, address, clothType, picture, requests) => {
      try{
        const createOrderData = await this.orderModel.create(
      { customerId,
        phoneNumber,
        address,
        clothType,
        picture,
        requests
      }
    );
    return createOrderData;
      } catch (error) {
          return error;
      }
  };

  // updateOrder = async (
  //   orderId,
  //   phone_number,
  //   address,
  //   cloth_type,
  //   picture,
  //   requests,
  //   status,
  // ) => {
  //   const updateOrder = await this.orderModel.update(
  //     {
  //       phone_number,
  //       address,
  //       cloth_type,
  //       picture,
  //       requests,
  //     //   status
  //     // }, { where: { id } }
  //       status,
  //     },
  //     { where: { orderId } },
  //
  //   );
  //
  //   return updateOrder;
  // };

  // deleteOrder = async (id) => {
  //   const deleteOrder = await this.orderModel.destroy(
  //     { where: { id } }
  //   );
  //
  //   return deleteOrder;
  // };
  //
  // managerSelect = async (managerId) => {
  //   const manager = await this.orderModel.findAll({
  //     where: { managerId: managerId }
  //   })
  //   return manager;
  // }


    //위에 있는 findOrderById와 다를 게 없는 코드로 보임. 둘 중 하나 삭제 필요.
  selectOrder = async (id) => {
      try{
          const orders = await this.orderModel.findAll({
          where: { id }
        });
    return orders;
      } catch (error){
          return error;
      }
  }

  findIfProceedingOrder = async (managerId) => {
      try{
          const orders = await this.orderModel.findAll(
      {where: {[Op.and]: [{managerId: managerId}, {status: {[Op.not]:5}}]}}
      );
      return orders;
      } catch (error){
          return error;
      }
  }

  statusUpdate = async (new_status,orderId, managerId) => {
      try{
          const statusUpdate = await this.orderModel.update({
        status: new_status,
        managerId: managerId
    },
    {where:{id:orderId}});
    return statusUpdate;
      } catch (error){
          return error;
      }
  }
  // statusFind = async (id) => {
  //   const status = await Order.findAll({
  //     // attributes: ['status'],
  //     where: { id },
  //   })
  //   console.log('aaa', status)
  //   return status;
  // }

}

module.exports = OrderRepository;


