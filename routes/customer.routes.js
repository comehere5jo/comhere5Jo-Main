const express = require('express');
const router = express.Router();
const authMiddleware = require("../auth-middleware/auth-middleware");


const CustomerController = require('../controllers/customer.controller');
const customerController = new CustomerController();
const OrderController = require('../controllers/orders.controller');
const orderController = new OrderController();


router.get('/mypoint', authMiddleware, customerController.getCustomerPoint); // Front: 마이페이지와 충돌. mypoint로 주소 변경.
router.post('/signup/customer', customerController.customerSignup);
router.post('/signin/customer', customerController.customerSignin);
//로그아웃
router.post('/signout/customer', authMiddleware, customerController.customerSignout);




// Front: 손님회원가입보여주기
router.get('/signup/customer', function customerController(req, res) {
    res.render('signup.ejs');
  });
  
  // Front: 손님로그인보여주기
  router.get('/signin/customer', function customerController(req, res) {
    res.render('loginCustomer.ejs');
  });
  
  
  //Front: 손님 마이페이지
  router.get('/me', authMiddleware, orderController.getMypage);

  
  //Front: 손님 로그인보여주기
  router.get('/signin/customer', function customerController(req, res) {
    res.render('login.ejs');
  });


module.exports = router;