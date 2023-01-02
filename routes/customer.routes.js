const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/customer.controller');
const customerController = new CustomerController();


// router.get('/', postsController.getPosts);
// router.post('/', postsController.createPost);
router.post('/signup/customer', customerController.customerSignup);
router.post('/signin/customer', customerController.customerSignin);



module.exports = router;