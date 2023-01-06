// 🥫 data Access Layer
// 데이터 액세스 계층은 쿼리를 수행하여 데이터베이스와 상호 작용합니다. 제가 사용하고 있는 Sequelize는 Data Access Layer의 역할의 일부를 대체해줍니다.
// sequelize를 사용하지 않으면 아래와 같이 data Access Layer를 담당하는 파일에 쿼리문을 모아서 필요할 때 service 계층에서 호출해서 사용합니다.

// const { Manager } = require('.././models');

// Manager에 들어가야 할것들
// 사장님 회원가입, 로그인, 포인트 확인 find create / point

class ManagerRepository {
  constructor(managerModel) {
     this.managerModel = managerModel;
  } 

 // Front: 마이페이지용 사장님정보조회
 findByPk = async (id) => {

  // const customer = await Customer.findByPk(id);
  const manager = await this.managerModel.findByPk(id);
  // console.log(customer);

  return manager;
};



  findManager = async () => {
      try{
          const findManager = await this.managerModel.findAll();
            return findManager;
      } catch (error){
          return error;
      }
  }

findCertainManager = async (loginId) => {
    try {
      const findCustomer = await this.managerModel.findOne({ where: { loginId } });
      return findCustomer;
    } catch (error) {
      return error;
    }
  };

createManager = async (loginId,encryptedPassword,name) => {
    try{
        const createManagerdata = await this.managerModel.create({
          loginId,
          loginPw: encryptedPassword,
          name,
        });
    return createManagerdata;
    } catch (error){
        return error;
    }
  }

    findOneManager = async (id) => {
        try{
            const managerPoint = await this.managerModel.findOne({
              where: {
                id: id
              }
            });
        return managerPoint;
        } catch (error){
            return error;
        }
  };

  managerPointUpdate = async (point, id) => {
      try{
          const pointUp = await this.managerModel.update(
              {
                point: point
              },
              { where: { id: id } }
            )
            return pointUp;
      } catch (error){
          return error;
      }

  }
  // findOneManager = async (managerId) => {
  //   const manager = await this.managerModel.findAll({
  //     where: { id: managerId }
  //   })
  //   return manager
  // }
}

module.exports = ManagerRepository;