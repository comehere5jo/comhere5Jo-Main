// 손님들이 신청한 세탁물 조회
// 본인의 세탁 서비스 평점 및 리뷰 조회
const ManagerService = require('../services/manager.service');
class ManagerController {
    managerService = new ManagerService();
    //현재 손님들이 신청한 세탁물에 대한 조회
    //controller에서는 클라이언트에 대한 응답만을 작성하였다.
    getOrder = async (req, res, next) => {
        const getOrder = await this.managerService.getOrder();
        console.log("getOrder.controller",getOrder)
        res.status(200).json({data:getOrder})
    }
    getOrderReview = async (req, res, next) => {
        const {orderId} = req.params;
        console.log(orderId)
        const getOrderReview = await this.managerService.getOrderReview(orderId);
        res.status(200).json({data:getOrderReview})
    }
    getMyOrderReview = async (req, res, next) => {
        const getMyOrderReview = await this.managerService.getMyOrderReview();
        res.status(200).json({data:getMyOrderReview})
    }
    getMyPoint = async (req, res, next) => {

        const myPoint = await this.managerService.getMyPoint();
        res.status(200).json({data:myPoint})
    }
}

module.exports = ManagerController;