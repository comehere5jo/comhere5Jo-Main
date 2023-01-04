// 손님들이 신청한 세탁물 조회
// 본인의 세탁 서비스 평점 및 리뷰 조회
const ManagerService = require('../services/manager.service');
class ManagerController {
    managerService = new ManagerService();

    getMyPoint = async (req, res, next) => {

        const myPoint = await this.managerService.getMyPoint();
        res.status(200).json({data:myPoint})
    }

  managerSignup = async (req, res) => {
    const { loginId, loginPw, confirmPw, name } = req.body;

    try {
      const signup = await this.managerService.managerSignup(
        loginId,
        loginPw,
        confirmPw,
        name,
      );

      if (typeof signup.message !== "undefined") {
        throw signup;
      }
      return res.status(201).send({ message: '회원가입 완료!' });
    } catch (error) {
      if (error.message === 'id 형식 틀림') {
        return res
          .status(412)
          .send({ errorMessage: 'ID의 형식이 일치하지 않습니다.' });
      } else if (error.message === 'pw 형식 틀림') {
        return res
          .status(412)
          .send({ errorMessage: '패스워드의 형식이 일치하지 않습니다.' });
      } else if (error.message === 'pw 일치 안함') {
        return res
          .status(412)
          .send({ errorMessage: '패스워드가 일치하지 않습니다.' });
      } else if (error.message === '닉네임 중복됨') {
        return res.status(412).send({ errorMessage: '중복된 닉네임입니다.' });
      } else if (error.message === '닉네임 비번 같음') {
        return res
          .status(412)
          .send({ errorMessage: '패스워드에 닉네임이 포함되어 있습니다.' });
      } else {
        res
          .status(400)
          .send({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' });
      }
    }
  };

  managerSignin = async (req, res, next) => {
    try {
      const { loginId, loginPw } = req.body;

      const signin = await this.managerService.managerSignin(
        loginId,
        loginPw,
      );

      res.cookie('token', signin);

      if (signin.message === 'id나 비번 확인해') {
        throw new Error('id나 비번 확인해');
        return;
      }

      return res.status(201).send({ message: '로그인 완료!' });
    } catch (error) {
      if (error.message === 'id나 비번 확인해') {
        return res
          .status(412)
          .send({ errorMessage: '닉네임 또는 패스워드를 확인해주세요.' });
      } else {
        return res
          .status(400)
          .send({ errorMessage: '로그인에 실패하였습니다.' });
      }
    }
  };

}

module.exports = ManagerController;