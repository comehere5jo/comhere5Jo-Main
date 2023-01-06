const express = require('express');
const router = express.Router();
const authMiddleware = require("../auth-middleware/auth-middleware");

const ManagerController = require('../controllers/manager.controller');
const managerController = new ManagerController();
const OrderController = require('../controllers/orders.controller'); // 230106 Front: 사장님 주문조회용 
const orderController = new OrderController();  // 230106 Front: 사장님 주문조회용 

router.get('/manager/my_point', authMiddleware, managerController.getManagerPoint);

router.post('/signin/manager', managerController.managerSignin);
router.post('/signup/manager', managerController.managerSignup);

//사장님 로그아웃
router.post('/signout/manager', authMiddleware, managerController.managerSignout);

// 230106 Front: 사장님회원가입보여주기
router.get('/signup/manager', function customerController(req, res) {
    res.render('signupManager.ejs');
  });

  // 230106 Front: 사장님로그인보여주기
  router.get('/signin/manager', function customerController(req, res) {
    res.render('loginManager.ejs');
  });

  // 230106 Front: 사장님 마이페이지
  router.get('/me/manager', authMiddleware, orderController.getMypageManager);



module.exports = router;