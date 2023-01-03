const { Review } = require('.././models');

class ReviewRepository {
  // constructor(reviewModel) {
  //   this.reviewModel = reviewModel;
  // }

  //리뷰조회(주문번호에대한리뷰조회)
  findReviewByOrderId = async (orderId) => {
    const review = await Review.findAll({ where: { orderId } });

    return review;
  };

  //리뷰작성
  writeReview = async (rating, content, picture, orderId) => {
    return await Review.create({
      rating,
      content,
      picture,
      orderId,

      // customerId,
    });
  };

  //리뷰수정
  updateReview = async (id, rating, content, picture) => {
    const updatedReviewData = await Review.update(
      { rating, content, picture },
      { where: { id } },
    );
    return updatedReviewData;
  };

  //리뷰삭제
  deleteReview = async (id) => {
    return await Review.destroy({ where: { id } });
  };
}

managerReviewUpdate = async (id, managerId, comment) => {
  const managerReviewUpdateData = await this.reviewModel.update(
    { managerId, comment },
    { where: { id: id } },
  );
  return managerReviewUpdateData;
};

module.exports = ReviewRepository;

// //내가 작성한 리뷰조회
// findReview = async (customerId) => {
//   const reviews = await Review.findAll(customerId);
//   return reviews;
// };

// createReview = async (customerId, rating, content, picture) => {
//   const createReviewData = await this.reviewModel.create({
//     customerId,
//     rating,
//     content,
//     picture,
//   });
//   return createReviewData;
// };

// findAllReview = async () => {
//   const reviews = await this.reviewModel.findAll();
//   return reviews;
// };

// findReviewId = async (id) => {
//   const review = await this.reviewModel.findByPk(id);
//   return review;
// };
