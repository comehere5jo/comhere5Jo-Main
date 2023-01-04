// middlewares/auth-middleware.js
require('dotenv').config({ path: '../../.env' });
const jwt = require('jsonwebtoken');

const { Customer } = require('../models');
const { Manager } = require('../models');

module.exports = (req, res, next) => {
  const token = req.headers.cookie.split('=')[1];

  if (!token) {
    res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
    return;
  }

  try {
    // 복호화 및 검증
    const { id, member } = jwt.verify(token, process.env.JWT_SECRET);

    if (member === 'customer'){
      Customer.findByPk(id).then((customer) => {
        req.customer = customer;
        return next();
      });
    } else if (member === 'manager'){
      Manager.findByPk(id).then((manager) => {
        req.manager = manager;
        return next();
      });
    }

  } catch (err) {
    res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
  }
};