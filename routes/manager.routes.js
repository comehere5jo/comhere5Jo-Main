const express = require('express');
const router = express.Router();

const ManagerController = require('../controllers/manager.controller');
const managerController = new ManagerController();

router.get('/manager/order', managerController.getOrder);
router.get('/order/:orderId/review', managerController.getOrderReview);
router.get('/me/review', 
managerController.getMyOrderReview);
router.get('/manager/my_point',managerController.getMyPoint);

<<<<<<< HEAD
=======
router.get('/', managerController.getMangers)
router.put('/:managerId', managerController.putFirstOreder)
router.put('/:managerId/:orderId', managerController.putOrederUpdate)
>>>>>>> fa609409c0f9b9a2e1a89687136602eb986c1a67
module.exports = router;