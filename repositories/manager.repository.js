// 🥫 data Access Layer
// 데이터 액세스 계층은 쿼리를 수행하여 데이터베이스와 상호 작용합니다. 제가 사용하고 있는 Sequelize는 Data Access Layer의 역할의 일부를 대체해줍니다.
// sequelize를 사용하지 않으면 아래와 같이 data Access Layer를 담당하는 파일에 쿼리문을 모아서 필요할 때 service 계층에서 호출해서 사용합니다.

// const { Manager } = require('.././models');

// Manager에 들어가야 할것들
// 사장님 회원가입, 로그인, 포인트 확인 find create / point



const {Manager} = require("../models");

class ManagerRepository {
constructor(managerModel) {
   this.managerModel = managerModel;
} 

findManager = async () => {
  const findManager = await Manager.findAll();
  return findManager;
}

findCertainManager = async (loginId) => {
    try {
      const findCustomer = await Manager.findOne({ where: { loginId } });
      return findCustomer;
    } catch (error) {
      return error;
    }
  };

createManager = async (loginId,encryptedPassword,name) => {
    const createManagerdata = await Manager.create({
      loginId,
      loginPw: encryptedPassword,
      name,
    });
    return createManagerdata;
}

managerPoint = async (id) => {
    const managerPoint = await Manager.findAll(id);
    return managerPoint;
  };

}    

module.exports = ManagerRepository;