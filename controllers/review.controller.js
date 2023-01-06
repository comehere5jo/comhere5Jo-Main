const ReviewService = require('../services/review.service.js');
const OrderRepository = require("../repositories/order.repository");
const {Order} = require("../models");

class ReviewController {
  reviewService = new ReviewService();

  //리뷰조회(주문번호에대한리뷰조회)(확인완료)
  getReviewByOrderId = async (req, res, next) => {
    try {
      const {orderId} = req.params;
      const review = await this.reviewService.findReviewByOrderId(orderId);
      if(typeof review.message !== 'undefined'){
        throw review
      }
      res.status(200).json({review});
    } catch (error) {
      console.error(error)
      if(error.message === '리뷰가 존재하지 않습니다.'){
        return res.status(404).json({message: error.message})
      } else{
        res.status(400).json({message: '리뷰 조회 실패'});
      }
    }
  };

  //리뷰작성(확인완료)
  writeReview = async (req, res, next) => {
    try {
      const customerId = req.customer.id;
      const {rating, content, picture} = req.body;
      const {orderId} = req.params;

      const writeReviewData = await this.reviewService.writeReview(
          rating,
          content,
          picture,
          orderId,
          customerId
      );

      if (typeof writeReviewData.message !== 'undefined') {
        throw writeReviewData
      }

      res.status(201).json({data: writeReviewData});
    } catch (error) {
      console.error(error)
      if(error.message === '주문이 완료되지 않았습니다.'){
        return res.status(400).json({message: error.message})
      } else if (error.message === '내용을 입력하세요.'){
        return res.status(400).json({message: error.message})
      } else {
        res.status(400).json({message: '리뷰 작성 실패'});
      }
    }
  };

  //리뷰수정(확인완료)
  updateReview = async (req, res, next) => {
    try {
      const id = req.params.reviewId;

      const {rating, content, picture, comment} = req.body;

      if (req.customer){
        const updatedReview = await this.reviewService.updateReview(
          id,
          rating,
          content,
          picture,
            null,
            null
          )
        if(typeof updatedReview.message !== "undefined"){
          throw updatedReview;
        }
        return res.status(200).json({data: updatedReview});
      } else if (req.manager){
        const managerId = req.manager.id
        const updatedReview = await this.reviewService.updateReview(
            id,
            null,
            null,
            null,
            comment,
            managerId
        )
        if(typeof updatedReview.message !== "undefined"){
          throw updatedReview;
        }
        return res.status(200).json({data: updatedReview});
      }

    } catch (error) {
      if(error.message = "작성된 리뷰가 없습니다."){
        res.status(400).send({errorMessage: error.message});
      } else {
        res.status(500).send({errorMessage: "작성 혹은 수정에 실패하였습니다."})
      }
    }
  };

  //리뷰삭제(확인완료)
  deleteReview = async (req, res, next) => {
    try {
      const id = req.params.reviewId;
      const deleteReview = await this.reviewService.deleteReview(id);

      console.log('컨트롤', deleteReview)

      if(typeof deleteReview !== "undefined"){
        throw deleteReview;
      }

      return res.status(201).json({message: '삭제 성공했습니다.'});
    } catch (error) {
      console.error(error);
      if(error.message === '작성된 리뷰가 없습니다.'){
        return res.status(404).json({message: error.message})
      } else{
        return res.status(500).json({message: '리뷰 삭제 실패'})
      }
    }
  };

  //사장님이 본인이 처리한 주문에 대한 리뷰 조회(확인완료)
  getMyOrderReview = async (req, res, next) => {
    try{
      if(req.manager && req.manager.id){
        const {id} = req.manager;
        const getMyOrderReview = await this.reviewService.getMyOrderReview(id);

        if(typeof getMyOrderReview.message !== 'undefined'){
          throw getMyOrderReview}

        return res.status(200).json({data: getMyOrderReview})
      } else {
          throw new Error('사장님만 이용가능한 서비스입니다.')
        }
    } catch (error){
      console.error(error);
      if(error.message === '작성된 리뷰가 없습니다.'){
        return res.status(400).json({message: error.message})
      } else if (error.message === '사장님만 이용가능한 서비스입니다.'){
        return res.status(400).json({message: error.message})
      } else {
        return res.status(500).json({message: '리뷰 조회에 실패하였습니다.'});
      }
    }
  }

}
module.exports = ReviewController;

//내가 작성한 리뷰조회 (나의 주문에 대한 리뷰보기)
//   getReviewByCustomerId = async (req, res, next) => {
//     const { customerId } = req.headers;
//     const reviews = await this.reviewService.findReviewByCustomerId(customerId);

//     res.status(200).json({ data: reviews });
//   };
