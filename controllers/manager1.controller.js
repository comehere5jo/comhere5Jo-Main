// 컨트롤러는 들어오는 클라이언트 요청을 받고 서비스에 전달한다.
// 서비스에서 작업을 마친 데이터를 받아 클라이언트에게 응답한다.
// Controller에는 데이터를 가공하는 등의 비즈니스 로직을 추가하면 안된다.
const ManagergetService = require('../services/managerget.service');

class ManagerController {
  managerService = new ManagergetService()
  
  getMangers = async (req,res,next) => {
    const managers = await this.managerService.findCustomerOreder()
    res.status(200).json({data:managers})
  }

  putFirstOreder = async(req,res,next) => {
    const { managerId } = req.params
    const {orderId} = req.body
    const firstOrder = await this.managerService.selectOrder(orderId, managerId)
    res.status(200).json({data:firstOrder})
  }

  putOrederUpdate = async(req,res,next) => {
    const { managerId, orderId } = req.params
    const {status} = req.body
    const updateOrder = await this.managerService.updateOrder(orderId, managerId, status)
    res.status(200).json({data:updateOrder})
  }
}

module.exports = ManagerController;