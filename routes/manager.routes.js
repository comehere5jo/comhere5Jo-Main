const express = require('express');
const router = express.Router();

const ManagerController = require('../controllers/manager1.controller');
const managerController = new ManagerController();

router.get('/manager/order', managerController.getOrder);

router.get('/order/:order_id/review', managerController.getOrderReview);

router.get('/me/review', 
managerController.getMyOrderReview
);

router.get('/', managerController.getMangers)
router.put('/:managerId', managerController.putFirstOreder)
router.put('/:managerId/:orderId', managerController.putOrederUpdate)
module.exports = router;