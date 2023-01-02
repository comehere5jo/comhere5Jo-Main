
// 컨트롤러는 들어오는 클라이언트 요청을 받고 서비스에 전달한다.
// 서비스에서 작업을 마친 데이터를 받아 클라이언트에게 응답한다.
// Controller에는 데이터를 가공하는 등의 비즈니스 로직을 추가하면 안된다.

const CustomerService = require('../services/customer.service');

class CustomerController {
    customerService = new CustomerService();

    customerSignup = async (req, res, next) => {
        const { loginId, loginPw, confirmPw, name } = req.body;

        const nameReg = /^[a-zA-Z0-9]{3,}$/

        try{

        } catch (err) {
            if
        }

        await this.customerService.customerSignup(
            loginId,
            loginPw,
            name
        );

        res.status(201).send({message:"회원가입 완료!"})
    }


}

module.exports = CustomerController;