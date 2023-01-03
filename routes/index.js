const express = require('express');
const router = express.Router();

const ManagerRouter = require('./manager.routes');
router.use('/', ManagerRouter);

const CustomerRouter = require('./customer.routes');
router.use('/', CustomerRouter);

const OrderRouter = require('./order.routes')
router.use('/', OrderRouter);

module.exports = router;
