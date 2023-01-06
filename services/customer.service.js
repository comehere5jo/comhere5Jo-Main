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

const CustomerRepository = require('../repositories/customer.repository');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { Customer } = require('.././models');


class CustomerService {
  customerRepository = new CustomerRepository(Customer);


    // Front: 마이페이지용 고객정보조회
    findByPk = async (id) => {
      const findCustomer = await this.customerRepository.findByPk(id);
      console.log("service", id);
  
      return {
        id: findCustomer.id,
        loginId: findCustomer.loginId,
        loginPw: findCustomer.loginPw,
        name: findCustomer.name,
        point: findCustomer.point,
        createdAt: findCustomer.createdAt,
        updatedAt: findCustomer.updatedAt,
      };
    };
  

    



  //손님포인트조회
  getCustomerPoint = async (id) => {
    try {
       const customer = await this.customerRepository.findOneCustomer(id);
    if (!customer) throw new Error('등록된 고객 정보가 없습니다.');

    return customer.point;
    } catch (error) {
      return error;
    }

  }

  //회원가입(확인완료)
  customerSignup = async (loginId, loginPw, confirmPw, name) => {
    const idReg = /^[a-zA-Z0-9]{3,}$/;
    try {
      if (!idReg.test(loginId)) {
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

  //로그인(확인완료)
  customerSignin = async (loginId, loginPw) => {
    try {
      const customer = await this.customerRepository.findCertainCustomer(
        loginId,
      );

      const check = await bcrypt.compare(loginPw, customer.loginPw);

      if (customer !== null) {
        if (check) {
          const token = jwt.sign(
            { loginId: loginId, id: customer.id, member: 'customer' },
            process.env.JWT_SECRET,
            {
              expiresIn: '1h',
            },
          );
          console.log(token)
          return token;
        }else if(check === false) {
        throw new Error('비번 확인해');}
      } else {
        throw new Error('id 확인해');
      }
      return;
    } catch (error) {
      return error;
    }

  };

}

module.exports = CustomerService;
