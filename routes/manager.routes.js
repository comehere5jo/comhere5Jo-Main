const express = require('express');
const router = express.Router();

const ManagerController = require('../controllers/manager.controller');
const managerController = new ManagerController();

router.get('/manager/order', managerController.getOrder);
router.get('/order/:orderId/review', managerController.getOrderReview);
router.get('/me/review', 
managerController.getMyOrderReview);
router.get('/manager/my_point',managerController.getMyPoint);

module.exports = router;