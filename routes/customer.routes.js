const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/customer.controller');
const customerController = new CustomerController();

//손님포인트조회
router.get('/me', customerController.getCustomerPoint);

module.exports = router;
