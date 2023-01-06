const express = require('express');
const router = express.Router();

const ReviewRouter = require('./review.routes');
router.use('/order', ReviewRouter)

const ManagerRouter = require('./manager.routes');
router.use('/', ManagerRouter);

const CustomerRouter = require('./customer.routes');
router.use('/', CustomerRouter);

const OrderRouter = require('./order.routes')
router.use('/', OrderRouter);


// Front: 메인페이지 
router.get('/', async (req, res, next) => {
    res.render('index.ejs'); 
});

// Front: 로그인페이지
router.get('/login', async (req, res, next) => {
  res.render('login.ejs'); 
});



module.exports = router;
