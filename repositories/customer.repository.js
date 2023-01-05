// const { Customer } = require('.././models');
const { Op } = require('sequelize');

class CustomerRepository {
  constructor(customerModel) {
    this.customerModel = customerModel;
  }

  // findAllCustomer = async () => {
  //   const findCustomers = await this.customerModel.findAll();
  //   return findCustomers;
  // };

  findCertainCustomer = async (loginId) => {
    try {
      const findCustomer = await this.customerModel.findOne({ where: { loginId } });
      return findCustomer;
    } catch (error) {
      return error;
    }
  };

  findOneCustomer = async function (id) {
    try{
          return await this.customerModel.findOne({ where: { id } });
    } catch (error){
      return error
    }
  };

  createCustomer = async (loginId, encryptedPassword, name) => {
    try{
      const createCustomerData = await this.customerModel.create({
      loginId,
      loginPw: encryptedPassword,
      name,
    });
    return createCustomerData;
    } catch (error){
      return error;
    }
  }   ;
  };


//   //손님포인트조회(상단의 findOneCustomer와 중복되어 사용안함)
//   findCustomerPoint = async (id) => {
//     const customerPoint = await this.customerModel.findByPk(id);
//     return customerPoint;
//   };
// }

module.exports = CustomerRepository;
