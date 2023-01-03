const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/orders.controller');
const orderController = new OrderController();

router.get('/order', orderController.getOrders);
router.get('/order/:orderId', orderController.getOrderById);
router.post('/orderPost', orderController.createOrder);

// 임의 생성 - 마이페이지
router.get('/myPage' ,orderController.controller)



module.exports = router;
