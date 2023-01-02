const express = require('express');
const router = express.Router();

const ManagerController = require('../controllers/manager1.controller');
const managerController = new ManagerController();


router.get('/', managerController.getMangers)
router.put('/:managerId', managerController.putFirstOreder)
router.put('/:managerId/:orderId', managerController.putFirstOreder)
module.exports = router;