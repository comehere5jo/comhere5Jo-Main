const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/customer.controller');
const customerController = new CustomerController();


// router.get('/', postsController.getPosts);
// router.post('/', postsController.createPost);
router.get('/', customerController.customerSignup);


module.exports = router;