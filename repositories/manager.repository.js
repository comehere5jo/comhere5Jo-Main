// ๐ฅซ data Access Layer
// ๋ฐ์ดํฐ ์ก์ธ์ค ๊ณ์ธต์ ์ฟผ๋ฆฌ๋ฅผ ์ํํ์ฌ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์ํธ ์์ฉํฉ๋๋ค. ์ ๊ฐ ์ฌ์ฉํ๊ณ  ์๋ Sequelize๋ Data Access Layer์ ์ญํ ์ ์ผ๋ถ๋ฅผ ๋์ฒดํด์ค๋๋ค.
// sequelize๋ฅผ ์ฌ์ฉํ์ง ์์ผ๋ฉด ์๋์ ๊ฐ์ด data Access Layer๋ฅผ ๋ด๋นํ๋ ํ์ผ์ ์ฟผ๋ฆฌ๋ฌธ์ ๋ชจ์์ ํ์ํ  ๋ service ๊ณ์ธต์์ ํธ์ถํด์ ์ฌ์ฉํฉ๋๋ค.

// const { Manager } = require('.././models');

// Manager์ ๋ค์ด๊ฐ์ผ ํ ๊ฒ๋ค
// ์ฌ์ฅ๋ ํ์๊ฐ์, ๋ก๊ทธ์ธ, ํฌ์ธํธ ํ์ธ find create / point

class ManagerRepository {
  constructor(managerModel) {
     this.managerModel = managerModel;
  } 

 // Front: ๋ง์ดํ์ด์ง์ฉ ์ฌ์ฅ๋์ ๋ณด์กฐํ
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