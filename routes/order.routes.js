const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/orders.controller');
const orderController = new OrderController();

router.get('/order', orderController.getOrders);
router.get('/order/:orderId', orderController.getOrderById);
router.post('/orderPost', orderController.createOrder);

// 임의 생성 - 마이페이지
router.get('/myPage' ,orderController.controller)
router.get('/', orderController.getMangers)
router.get('/manager/order', orderController.getOrder);
router.put('/:managerId', orderController.putFirstOrder)
router.put('/:managerId/:orderId', orderController.putOrderUpdate)

module.exports = router;
