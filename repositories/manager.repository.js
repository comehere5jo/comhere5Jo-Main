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

managerLogin = async () => {

    
}

managerSignin = async (loginId,loginPw,name,point) => {
    const createManagerdata = await this.managerModel.create({
      loginId,
      loginPw,
      name,
      point
    });
    return createManagerdata;
}
managerPoint = async (id) => {
    const point = await this.managerModel.findByPk(id);

    return post;
  };

}    

module.exports = ManagerRepository;