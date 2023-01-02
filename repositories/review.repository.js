// 🥫 data Access Layer
// 데이터 액세스 계층은 쿼리를 수행하여 데이터베이스와 상호 작용합니다. 제가 사용하고 있는 Sequelize는 Data Access Layer의 역할의 일부를 대체해줍니다.
// sequelize를 사용하지 않으면 아래와 같이 data Access Layer를 담당하는 파일에 쿼리문을 모아서 필요할 때 service 계층에서 호출해서 사용합니다.
// const { Review } = require('.././models');

class ReviewRepository {
  constructor(reviewModel) {
    this.reviewModel = reviewModel;
  }

  findAllReview = async () => {
    const reviews = await this.reviewModel.findAll();
    return reviews;
  };

  findReviewId = async (id) => {
    const review = await this.reviewModel.findByPk(id);
    return review;
  };

  createReview = async (customerId, rating, content, picture) => {
    const createReviewData = await this.reviewModel.create({
      customerId,
      rating,
      content,
      picture,
    });
    return createReviewData;
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
