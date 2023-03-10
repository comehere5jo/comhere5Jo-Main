// π§ service
// μλΉμ€ κ³μΈ΅μ λλ¨Έμ§ μ νλ¦¬μΌμ΄μμμ λͺ¨λ  λΉμ¦λμ€ λ‘μ§μ μΊ‘μννκ³  μΆμνν©λλ€.

// β­ Service Layer Sould.

// λΉμ¦λμ€ λ‘μ§ ν¬ν¨
// λ°μ΄ν° μ‘μΈμ€ κ³μΈ΅μ νμ©νμ¬ λ°μ΄ν°λ² μ΄μ€μ μνΈ μμ©
// controller κ³μΈ΅μ μ λ¬ν  λ°μ΄ν° λ¦¬ν΄
// β Service Layer Sould Not.

// req , res νμ©
// ν΄λΌμ΄μΈνΈμ λν μλ΅ μ²λ¦¬
// λ°μ΄ν°λ² μ΄μ€μ μ§μ  μνΈ μμ©

const CustomerRepository = require('../repositories/customer.repository');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { Customer } = require('.././models');


class CustomerService {
  customerRepository = new CustomerRepository(Customer);


    // Front: λ§μ΄νμ΄μ§μ© κ³ κ°μ λ³΄μ‘°ν
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
  

    



  //μλν¬μΈνΈμ‘°ν
  getCustomerPoint = async (id) => {
    try {
       const customer = await this.customerRepository.findOneCustomer(id);
    if (!customer) throw new Error('λ±λ‘λ κ³ κ° μ λ³΄κ° μμ΅λλ€.');

    return customer.point;
    } catch (error) {
      return error;
    }

  }

  //νμκ°μ(νμΈμλ£)
  customerSignup = async (loginId, loginPw, confirmPw, name) => {
    const idReg = /^[a-zA-Z0-9]{3,}$/;
    try {
      if (!idReg.test(loginId)) {
        throw new Error('id νμ νλ¦Ό');
        return;
      }
      if (loginPw.length < 4) {
        throw new Error('pw νμ νλ¦Ό');
        return;
      }
      if (loginPw !== confirmPw) {
        throw new Error('pw μΌμΉ μν¨');
        return;
      }

      if (loginPw.includes(loginId)) {
        throw new Error('λλ€μ λΉλ² κ°μ');
        return;
      }
      const duplicateId = await this.customerRepository.findCertainCustomer(
        loginId,
      );
      if (duplicateId) {
        throw new Error('λλ€μ μ€λ³΅λ¨');
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

  //λ‘κ·ΈμΈ(νμΈμλ£)
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
        throw new Error('λΉλ² νμΈν΄');}
      } else {
        throw new Error('id νμΈν΄');
      }
      return;
    } catch (error) {
      return error;
    }

  };

}

module.exports = CustomerService;
