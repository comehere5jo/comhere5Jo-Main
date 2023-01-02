const express = require('express');
const router = express.Router();

const ManagerController = require('../controllers/manager1.controller');
const managerController = new ManagerController();


router.get('/', managerController.getMangers)
router.get('/:managerId', managerController.getReviews)

module.exports = router;