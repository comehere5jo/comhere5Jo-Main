const express = require('express');
const router = express.Router();
const authMiddleware = require("../auth-middleware/auth-middleware");

const OrderController = require('../controllers/orders.controller');
const orderController = new OrderController();

//주문상태 상관없이 모든 주문 조회
router.get('/order', orderController.getOrders);
//수락 안된 모든 주문 조회
router.get('/manager/order', orderController.getOrder);
//특저 주문 조회
router.get('/order/:orderId', orderController.getOrderById);
//세탁주문신청
router.post('/orderPost', authMiddleware, orderController.createOrder);

// 임의 생성 - 마이페이지
router.get('/myPage' ,orderController.controller)
//
router.get('/', orderController.getMangers)

router.put('/api/:orderId', authMiddleware, orderController.putFirstOrder)
router.put('/api/:orderId/statusChange', orderController.putOrderUpdate)

module.exports = router;
