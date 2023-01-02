// 🧀 service
// 서비스 계층은 나머지 애플리케이션에서 모든 비즈니스 로직을 캡슐화하고 추상화합니다.

// ⭕ Service Layer Sould.

// 비즈니스 로직 포함
// 데이터 액세스 계층을 활용하여 데이터베이스와 상호 작용
// controller 계층에 전달할 데이터 리턴
// ❌ Service Layer Sould Not.

// req , res 활용
// 클라이언트에 대한 응답 처리
// 데이터베이스와 직접 상호 작용
const express = require('express');
const app = express();
const CustomerRepository = require('../repositories/customer.repository');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

class CustomerService {
  customerRepository = new CustomerRepository();

  customerSignup = async (loginId, loginPw, confirmPw, name) => {
    const nameReg = /^[a-zA-Z0-9]{3,}$/;
    try {
      if (!nameReg.test(loginId)) {
        throw new Error('id 형식 틀림');
        return;
      }
      if (loginPw.length < 4) {
        throw new Error('pw 형식 틀림');
        return;
      }
      if (loginPw !== confirmPw) {
        throw new Error('pw 일치 안함');
        return;
      }

      if (loginPw.includes(loginId)) {
        throw new Error('닉네임 비번 같음');
        return;
      }
      const duplicateId = await this.customerRepository.findCertainCustomer(
        loginId,
      );
      if (duplicateId) {
        throw new Error('닉네임 중복됨');
        return;
      }
      const encryptedPassword = await bcrypt.hash(loginPw, saltRounds);
      await this.customerRepository.createCustomer(
        loginId,
        encryptedPassword,
        name,
      );
      return true;
    } catch (error) {
      return error;
    }
  };

  customerSignin = async (loginId, loginPw) => {
    try {
      const customer = await this.customerRepository.findCertainCustomer(
        loginId,
      );

      console.log(customer);

      const check = await bcrypt.compare(loginPw, customer.loginPw);
      console.log(check);

      if (customer) {
        if (check) {
          console.log('확인용');
          const token = jwt.sign(
            { loginId: loginId, id: customer.id },
            process.env.JWT_ACCESS_SECRET,
            {
              expiresIn: '1h',
            },
          );
          /* console.log(token);
          res.cookie('token', token);
          console.log(res.cookie('token', token)); */
          return token;
        }
      } else {
        throw new Error('id나 비번 확인해');
      }
      return;
    } catch (error) {
      return error;
    }
  };
}

module.exports = CustomerService;
