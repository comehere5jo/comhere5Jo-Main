const reviewRepository = require('../repositories/review.repository.js');
const { Review } = require('../models');

class ReviewService {
  reviewRepository = new reviewRepository(Review);

  //리뷰조회(주문번호에대한리뷰조회)
  findReviewByOrderId = async (orderId) => {
    const review = await this.reviewRepository.findReviewByOrderId(orderId);

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
  };


  //리뷰작성(확인완료)
  writeReview = async (rating, content, picture, orderId, customerId) => {
    try{
      const gilhwan = await this.reviewRepository.findCertainOrder(orderId)
      if (gilhwan.status !== 5){
        throw new Error('주문완료안됨')
      }

      const writeReviewData = await this.reviewRepository.writeReview(
        rating,
        content,
        picture,
        orderId,
        customerId
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

  //리뷰수정
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


  //리뷰삭제
  deleteReview = async (id) => {
    const findReview = await this.reviewRepository.findById(id);
    if (!findReview) throw new Error("Order doesn't exist");

    await this.reviewRepository.deleteReview(id);

    return
  };

  //사장님이 본인이 처리한 주문에 대한 리뷰 조회
  getMyOrderReview = async (managerId) => {
    const getOrderReview = await this.reviewRepository.findReviewManagerId(managerId);
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
  }

}



module.exports = ReviewService;
