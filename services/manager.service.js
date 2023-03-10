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

const ManagerRepository = require('../repositories/manager.repository');
const { Manager } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const {get} = require("axios");

class ManagerService {
  constructor(){
    this.managerRepository = new ManagerRepository(Manager)
  }

// 230106 Front: λ§μ΄νμ΄μ§μ© μ¬μ₯λ μ λ³΄μ‘°ν
        findByPk = async (id) => {
          const findManager = await this.managerRepository.findByPk(id);
          console.log("service", id);
  
          return {
            id: findManager.id,
            loginId: findManager.loginId,
            loginPw: findManager.loginPw,
            name: findManager.name,
            point: findManager.point,
            createdAt: findManager.createdAt,
            updatedAt: findManager.updatedAt,
          };
   };

  //μ¬μ₯λ ν¬μΈνΈ μ‘°ν(νμΈμλ£)
  getManagerPoint = async (id) => {
    try {
      const getMyPoint = await this.managerRepository.findOneManager(id);
      if (!getMyPoint){
        throw new Error('λ±λ‘λ μ¬μ₯λ μ λ³΄κ° μμ΅λλ€.')
      }
      return {point: getMyPoint.point};
    } catch (error) {
      return error;
    }
  }

  managerSignup = async (loginId, loginPw, confirmPw, name) => {
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
      const duplicateId = await this.managerRepository.findCertainManager(
        loginId,
      );
      if (duplicateId) {
        throw new Error('λλ€μ μ€λ³΅λ¨');
        return;
      }
      const encryptedPassword = await bcrypt.hash(loginPw, saltRounds);
      await this.managerRepository.createManager(
        loginId,
        encryptedPassword,
        name,
      );
      return true;
    } catch (error) {
      return error;
    }
  };

  managerSignin = async (loginId, loginPw) => {
    try {
      const manager = await this.managerRepository.findCertainManager(
        loginId,
      );

      const check = await bcrypt.compare(loginPw, manager.loginPw);

      if (manager !== null) {
        if (check) {
          const token = jwt.sign(
            { loginId: loginId, id: manager.id, member: 'manager' },
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
module.exports = ManagerService;