const reviewRepository = require('../repositories/review.repository.js');
const { Review } = require('../models');
const {get} = require("axios");

class ReviewService {
  reviewRepository = new reviewRepository(Review);

  //리뷰조회(주문번호에대한리뷰조회)(확인완료)
  findReviewByOrderId = async (orderId) => {
    try{
      const review = await this.reviewRepository.findReviewByOrderId(orderId);
      if(!review) {
        throw new Error('리뷰가 존재하지 않습니다.')
      }

      return {
        id: review.id,
        rating: review.rating,
        content: review.content,
        picture: review.picture,
        orderId: review.orderId,
        customerId: review.customerId,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      };
    } catch (error){
      return error;
    }
  };


  //리뷰작성(확인완료)
  writeReview = async (rating, content, picture, orderId, customerId) => {
    try{
      const gilhwan = await this.reviewRepository.findCertainOrder(orderId)
      if (gilhwan.status !== 5){
        throw new Error('주문이 완료되지 않았습니다.')
      }
      const managerId = gilhwan.managerId

      const writeReviewData = await this.reviewRepository.writeReview(
        rating,
        content,
        picture,
        orderId,
        customerId,
          managerId
    );

    if (!rating || !content) {
        throw new Error('내용을 입력하세요.');
      }

    return {
      rating: writeReviewData.rating,
      content: writeReviewData.content,
      picture: writeReviewData.picture,
      orderId: writeReviewData.orderId,
      customerId: writeReviewData.customerId,
      createdAt: writeReviewData.createdAt,
      updatedAt: writeReviewData.updatedAt
    };
    } catch (error) {
      return error;
    }
  };

  //리뷰수정(확인완료)
  updateReview = async (id, rating, content, picture, comment, managerId) => {
    try {
      const findReview = await this.reviewRepository.findById(id);
      console.log('findreview', findReview)
      if (findReview === null) throw new Error("작성된 리뷰가 없습니다.");

      let status = '0'

      if (rating !== null) {
        rating = rating
      } else {
        rating = findReview.rating
      }
      ;
      if (content !== null) {
        content = content
      } else {
        content = findReview.content
      }
      ;
      if (picture !== null) {
        picture = picture
      } else {
        picture = findReview.picture
      }
      ;
      if (comment !== null) {
        comment = comment;
        status = 1;
        managerId = managerId
      } else {
        comment = findReview.comment;
        status = findReview.status;
        managerId = findReview.managerId
      }
      ;

      await this.reviewRepository.updateReview(id, rating, content, picture, comment, status, managerId);

      const updatedReview = await this.reviewRepository.findById(id);

      return {
        id: updatedReview.id,
        rating: updatedReview.rating,
        content: updatedReview.content,
        picture: updatedReview.picture,
        updatedAt: updatedReview.updatedAt,
        status: updatedReview.status,
        comment: updatedReview.comment,
        managerId: updatedReview.managerId
      };
    } catch (error) {
      return error;
    }

  }


  //리뷰삭제(확인완료)
  deleteReview = async (id) => {
    try{
      const findReview = await this.reviewRepository.findById(id);
      if (!findReview) throw new Error("작성된 리뷰가 없습니다.");

      await this.reviewRepository.deleteReview(id);
      return;
    } catch (error){
      return error;
    }
  };

  //사장님이 본인이 처리한 주문에 대한 리뷰 조회(확인완료)
  getMyOrderReview = async (id) => {
    try{
      const getOrderReview = await this.reviewRepository.findReviewManagerId(id);
      if(!getOrderReview){
        throw new Error('작성된 리뷰가 없습니다.')
      }
      return getOrderReview.map((order) => {
        return {
          orderId: order.orderId,
          createdAt: order.createdAt,
          comment: order.comment,
          content: order.content,
          rating: order.rating,
          status: order.status
        };
      })
    } catch (error){
      return error;
    }
  }
}



module.exports = ReviewService;
