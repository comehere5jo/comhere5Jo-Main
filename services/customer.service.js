const CustomerRepository = require('../repositories/customer.repository');

class CustomerService {
  customerRepository = new CustomerRepository();

  //손님포인트조회
  getCustomerPoint = async (id) => {
    console.log(id);
    const customer = await this.customerRepository.findCustomerPoint(id);
    if (!customer) throw new Error('Customer not found');

    return customer.point;
  };
}

module.exports = CustomerService;
