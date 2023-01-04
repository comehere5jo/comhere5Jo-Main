
const CustomerService = require('../services/customer.service');

// 컨트롤러는 들어오는 클라이언트 요청을 받고 서비스에 전달한다.
// 서비스에서 작업을 마친 데이터를 받아 클라이언트에게 응답한다.
// Controller에는 데이터를 가공하는 등의 비즈니스 로직을 추가하면 안된다.


class CustomerController {
  customerService = new CustomerService();
  //손님포인트조회
  getCustomerPoint = async (req, res, next) => {
    // const id = req.customerId;
    // const id = 1;
    // console.log(id);


    try {
      const { id } = req.customer
      const point = await this.customerService.getCustomerPoint(id);
      res.status(200).json({ point });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };

  customerSignup = async (req, res) => {
    const { loginId, loginPw, confirmPw, name } = req.body;

    try {
      const signup = await this.customerService.customerSignup(
        loginId,
        loginPw,
        confirmPw,
        name,
      );
      console.log(signup)

      if (typeof signup.message !== 'undefined') {
        console.log('checkcheck')
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

  customerSignin = async (req, res, next) => {
    try {
      const { loginId, loginPw } = req.body;

      const signin = await this.customerService.customerSignin(
        loginId,
        loginPw,
      );

      res.cookie('token', signin);

      if (typeof signin.message !== 'undefined') {
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

module.exports = CustomerController;
