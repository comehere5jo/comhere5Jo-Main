const reviewRepository = require('../repositories/review.repository.js');
const { Review } = require('../models/index.js');

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

  //리뷰작성
  writeReview = async (rating, content, picture, orderId) => {
    const writeReviewData = await this.reviewRepository.writeReview(
      rating,
      content,
      picture,
      orderId,

      //   customerId,
    );
    console.log(writeReviewData);

    return {
      rating: writeReviewData.rating,
      content: writeReviewData.content,
      picture: writeReviewData.picture,
      orderId: writeReviewData.orderId,
      createdAt: writeReviewData.createdAt,
      updatedAt: writeReviewData.updatedAt,
    };
  };

  //리뷰수정
  updateReview = async (id, rating, content, picture) => {
    const findReview = await this.reviewRepository.findById(id);
    if (!findReview) throw new Error("Review doesn't exist");

    // Update review
    await this.reviewRepository.updateReview(id, rating, content, picture);

    // Retrieve updated review
    const updatedReview = await this.reviewRepository.findById(id);
    console.log(updatedReview);

    return {
      id: updatedReview.id,
      rating: updatedReview.rating,
      content: updatedReview.content,
      picture: updatedReview.picture,
      updatedAt: updatedReview.updatedAt,
    };
  };

  //리뷰삭제
  deleteReview = async (id) => {
    const findReview = await this.reviewRepository.findById(id);
    if (!findReview) throw new Error("Order doesn't exist");

    await this.reviewRepository.deleteReview(id);

    return {
      id: findReview.id,
      createdAt: findReview.createdAt,
      updatedAt: findReview.updatedAt,
    };
  };
}

module.exports = ReviewService;
