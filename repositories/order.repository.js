// ๐ฅซ data Access Layer
// ๋ฐ์ดํฐ ์ก์ธ์ค ๊ณ์ธต์ ์ฟผ๋ฆฌ๋ฅผ ์ํํ์ฌ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์ํธ ์์ฉํฉ๋๋ค.
// ์ ๊ฐ ์ฌ์ฉํ๊ณ  ์๋ Sequelize๋ Data Access Layer์ ์ญํ ์ ์ผ๋ถ๋ฅผ ๋์ฒดํด์ค๋๋ค.
// sequelize๋ฅผ ์ฌ์ฉํ์ง ์์ผ๋ฉด ์๋์ ๊ฐ์ด data Access Layer๋ฅผ ๋ด๋นํ๋ ํ์ผ์ ์ฟผ๋ฆฌ๋ฌธ์
// ๋ชจ์์ ํ์ํ  ๋ service ๊ณ์ธต์์ ํธ์ถํด์ ์ฌ์ฉํฉ๋๋ค.
const { Op } = require('sequelize')

class OrderRepository {
  constructor(orderModel) {
    this.orderModel =orderModel;
 }


    //๊ณ ๊ฐ๋์ด ์ ์ฒญํ ๋ชจ๋  ์ฃผ๋ฌธ๋ด์ญ ์กฐํ
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

//์๋ฝ ์๋ ๋ชจ๋  ์ฃผ๋ฌธ ์กฐํ
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



   // Front: ๋ง์ดํ์ด์ง์ ์ด ๊ณ ๊ฐ๋ง์ด ์ฃผ๋ฌธํ ์ ๋ณด๋ฅผ ์กฐํํ๊ธฐ ์ํด ์ฌ์ฉ

  findOrderByCustomer = async (customerId) => {

    const byCustomerOders = await this.orderModel.findAll({
      where : {customerId}
    });
    return byCustomerOders;
  };


 // 230106 Front: ๋ง์ดํ์ด์ง์ ์ด ์ฌ์ฅ๋๋ง์ ์ ์ ์ ๋ณด๋ฅผ ์กฐํํ๊ธฐ ์ํด ์ฌ์ฉ

 findOrderByManager = async (managerId) => {

  const byManagerOders = await this.orderModel.findAll({
    where : {managerId}
  });
  return byManagerOders;
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


    //์์ ์๋ findOrderById์ ๋ค๋ฅผ ๊ฒ ์๋ ์ฝ๋๋ก ๋ณด์. ๋ ์ค ํ๋ ์ญ์  ํ์.
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


