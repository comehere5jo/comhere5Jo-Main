const CustomerService = require('../services/customer.service');
console.log(CustomerService);

class CustomerController {
  customerService = new CustomerService();

  //손님포인트조회
  getCustomerPoint = async (req, res, next) => {
    // const id = req.customerId;
    const id = 1;
    console.log(id);

    try {
      const point = await this.customerService.getCustomerPoint(id);
      console.log(point);
      res.status(200).json({ point });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };
}

module.exports = CustomerController;
