const express = require('express');
const router = express.Router();

const ManagerController = require('../controllers/manager.controller');
const managerController = new ManagerController();

router.get('/manager/order', managerController.getOrder);

router.get('/order/:order_id/review', managerController.getOrderReview);

router.get('/me/review', 
managerController.getMyOrderReview
);


module.exports = router;