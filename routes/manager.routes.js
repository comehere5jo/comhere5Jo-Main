const express = require('express');
const router = express.Router();
const authMiddleware = require("../auth-middleware/auth-middleware");

const ManagerController = require('../controllers/manager.controller');
const managerController = new ManagerController();

router.get('/manager/my_point', authMiddleware, managerController.getManagerPoint);

router.post('/signin/manager', managerController.managerSignin);
router.post('/signup/manager', managerController.managerSignup);

//사장님 로그아웃
router.post('/signout/manager', authMiddleware, managerController.managerSignout);


module.exports = router;