// 컨트롤러는 들어오는 클라이언트 요청을 받고 서비스에 전달한다.
// 서비스에서 작업을 마친 데이터를 받아 클라이언트에게 응답한다.
// Controller에는 데이터를 가공하는 등의 비즈니스 로직을 추가하면 안된다.

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
        const getOrderReview = await this.managerService.getOrderReview();
        res.status(200).json({data:getOrderReview})
    }
    getMyOrderReview = async (req, res, next) => {
        const getOrderReview = await this.managerService.getOrderReview();
        res.status(200).json({data:getOrderReview})
    }
}

module.exports = ManagerController;