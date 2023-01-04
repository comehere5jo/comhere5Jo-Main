const express = require('express');
const router = express.Router();
const authMiddleware = require("../auth-middleware/auth-middleware");


const CustomerController = require('../controllers/customer.controller');
const customerController = new CustomerController();

router.get('/me', authMiddleware, customerController.getCustomerPoint);
router.post('/signup/customer', customerController.customerSignup);
router.post('/signin/customer', customerController.customerSignin);

module.exports = router;