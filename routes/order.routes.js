const express = require('express');
const router = express.Router();
const authMiddleware = require("../auth-middleware/auth-middleware");

const OrderController = require('../controllers/orders.controller');
const orderController = new OrderController();

//주문 진행 상태 상관 없이 고객님이 주문한 모든 주문 조회
router.get('/order', authMiddleware, orderController.getMyOrders);

// Front용: 수락 안된 모든 주문 조회 (주문현황보기 화면)
router.get('/orderlist', authMiddleware,orderController.getOrderForOrderlist);


//특정 주문 조회
router.get('/order/:orderId', orderController.getOrderById);
//세탁주문신청
router.post('/orderPost', authMiddleware, orderController.createOrder);
// Front: 세탁주문신청
router.get('/orderPost', function customerController(req, res) {
    res.render('orderPost.ejs');
});




// 임의 생성 - 마이페이지
router.get('/myPage' ,orderController.controller)
// //????
// router.get('/', orderController.getManagers)
//주문 수락
router.put('/api/:orderId/', authMiddleware, orderController.putFirstOrder)
//주문 진행 상태 변경
router.put('/api/:orderId/statusChange', authMiddleware, orderController.putOrderUpdate)

module.exports = router;
