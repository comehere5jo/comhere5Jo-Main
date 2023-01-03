const express = require('express');
const router = express.Router();

const ManagerController = require('../controllers/manager.controller');
const managerController = new ManagerController();


router.post('/signin/manager', managerController.managerSignin);
router.post('/signup/manager', managerController.managerSignup);

module.exports = router;