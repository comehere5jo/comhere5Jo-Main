const express = require('express');
const router = express.Router();
const authMiddleware = require("../auth-middleware/auth-middleware");

const ManagerController = require('../controllers/manager.controller');
const managerController = new ManagerController();

router.get('/manager/my_point', authMiddleware, managerController.getMyPoint);

router.post('/signin/manager', managerController.managerSignin);
router.post('/signup/manager', managerController.managerSignup);


module.exports = router;