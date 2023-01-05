
// 🥫 data Access Layer
// 데이터 액세스 계층은 쿼리를 수행하여 데이터베이스와 상호 작용합니다. 제가 사용하고 있는 Sequelize는 Data Access Layer의 역할의 일부를 대체해줍니다.
// sequelize를 사용하지 않으면 아래와 같이 data Access Layer를 담당하는 파일에 쿼리문을 모아서 필요할 때 service 계층에서 호출해서 사용합니다.

const { Review } = require('.././models');

class ReviewRepository {
  constructor(reviewModel) {
    this.reviewModel =reviewModel;
 } 

  //리뷰조회(주문번호에대한리뷰조회)
  findReviewByOrderId = async (orderId) => {
    const review = await this.reviewModel.findOne({ where: { orderId } });

    return review;
  };

  //리뷰찾기
  findById = async (id) => {
    const review = await this.reviewModel.findByPk(id);

    // console.log(review);
    return review;
  };

  findReviewOrderId = async (orderId) => {
    const review = await this.reviewModel.findAll({
      where: {
      orderId: orderId
      }
    });
    return review;
  };

  findReviewManagerId = async (managerId) => {
    const review = await this.reviewModel.findAll({
      where: {
        managerId: managerId
      }
    });
    return review;
  };

//지워야함
  // createReview = async (customerId, rating, content, picture) => {
  //   const createReviewData = await this.reviewModel.create({
  //     customerId,
  //     rating,
  //     content,
  //     picture,
  //     orderId,
  //     // customerId,
  //   });
  //   return createReviewData;
  // };

  //리뷰작성
  writeReview = async (rating, content, picture, orderId) => {
    return await this.reviewModel.create({
      rating,
      content,
      picture,
      orderId,
    });
  };

  //리뷰수정
  updateReview = async (id, rating, content, picture) => {
    const updatedReviewData = await this.reviewModel.update(
      { rating, content, picture },
      { where: { id } },
    );
    return updatedReviewData;
  };

  //리뷰삭제
  deleteReview = async (id) => {
    return await this.reviewModel.destroy({ where: { id } });
  };
  managerReviewUpdate = async (id, managerId, comment) => {
    const managerReviewUpdateData = await this.reviewModel.update(
      { managerId, comment },
      { where: { id: id } },
    );
    return managerReviewUpdateData;
  };
}



module.exports = ReviewRepository;



