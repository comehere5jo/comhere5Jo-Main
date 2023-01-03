// 컨트롤러는 들어오는 클라이언트 요청을 받고 서비스에 전달한다.
// 서비스에서 작업을 마친 데이터를 받아 클라이언트에게 응답한다.
// Controller에는 데이터를 가공하는 등의 비즈니스 로직을 추가하면 안된다.
const ManagergetService = require('../services/managerget.service');

class ManagerController {
  managerService = new ManagergetService()
    getMangers = async (req,res,next) => {
      const managers = await this.managerService.findCustomerOreder()
      console.log("불러올값",managers)
      res.status(200).render('main',{data:managers})
    }
 
  putFirstOreder = async(req,res,next) => {
    const { managerId } = req.params
    const {orderId} = req.body
    const firstOrder = await this.managerService.selectOrder(orderId, managerId)
    console.log("주문 수락", firstOrder)
    if(!firstOrder){
      return res.status(400).json({errorMessage:"사장님은 이미 주문을 진행중입니다."})
    }
    res.status(200).json({data:firstOrder})
  }

  putOrederUpdate = async(req,res,next) => {
    const { managerId, orderId } = req.params
    const {status} = req.body
    const updateOrder = await this.managerService.updateOrder(orderId, managerId, status)
    console.log('주문현황',updateOrder)
    if(!updateOrder){
      return res.status(400).json({errorMessage:"주문을 이미 완료하셨습니다."})
    }
    res.status(200).json({data:updateOrder})
  }
}

module.exports = ManagerController;