// __tests__/unit/posts.repository.unit.spec.js
const ReviewRepository = require('../../repositories/review.repository')


// posts.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockReviewModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  findOne: jest.fn(),
}

let reviewRepository = new ReviewRepository(mockReviewModel);

describe('Layered Architecture Pattern Review Repository Unit Test', () => {

  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

  test('리뷰 상세 조회 테스트(findReviewByOrderId)', async () => {
    mockReviewModel.findOne = jest.fn(() => {
      return "findOne String"
    })
    const review = await reviewRepository.findReviewByOrderId()
    expect(reviewRepository.reviewModel.findOne).toHaveBeenCalledTimes(1)
    expect(review).toBe('findOne String')

  });

  test('리뷰 상세 조회 테스트(findById Method)', async () => {
    mockReviewModel.findByPk = jest.fn(() => {
      return "findByPk String"
    })
    const review = await reviewRepository.findById()
    expect(reviewRepository.reviewModel.findByPk).toHaveBeenCalledTimes(1)
    expect(review).toBe('findByPk String')

  });

  test('리뷰 상세 조회 테스트(findReviewOrderId)', async () => {
    mockReviewModel.findByPk = jest.fn(() => {
      return "findReviewOrderId String"
    })
    const review = await reviewRepository.findById(1)
    expect(reviewRepository.reviewModel.findByPk).toHaveBeenCalledTimes(1)
    expect(review).toBe('findReviewOrderId String')

  });
  test('리뷰 상세 조회 테스트(findReviewManagerId)', async () => {
    mockReviewModel.findAll = jest.fn(() => {
      return "findReviewManagerId String"
    })
    const review = await reviewRepository.findReviewManagerId()
    expect(reviewRepository.reviewModel.findAll).toHaveBeenCalledTimes(1)
    expect(review).toBe('findReviewManagerId String')

  });

  test('리뷰 작성 테스트(writeReview)', async () => {
    mockReviewModel.create = jest.fn(() => {
      return "writeReview String"
    })
    const writeManagerParams = {
      rating: "writeReviewRating",
      content: "writeReviewContent",
      picture: "writeReviewPicture",
      orderId: "writeReviewOrderId",
    }
    const writeReviewData = await reviewRepository.writeReview(
      writeManagerParams.rating,
      writeManagerParams.content,
      writeManagerParams.picture,
      writeManagerParams.orderId,
    )
    expect(writeReviewData).toBe("writeReview String")
    expect(mockReviewModel.create).toHaveBeenCalledTimes(1)
    expect(mockReviewModel.create).toHaveBeenCalledWith({
      rating: writeManagerParams.rating,
      content: writeManagerParams.content,
      picture: writeManagerParams.picture,
      orderId: writeManagerParams.orderId,
    })
  });
  test('리뷰 수정 테스트(updateReview)', async () => {
    mockReviewModel.update = jest.fn(() => {
      return "updateReview String"
    })
    const updateReviewParams = {
      content: "updateReviewContent",
      rating: "updateReviewRating",
      picture: "updateReviewPicture",
      id: "id"
    }
    const updateReviewData = await reviewRepository.updateReview(
      updateReviewParams.id,
      updateReviewParams.rating,
      updateReviewParams.content,
      updateReviewParams.picture,
    )
    expect(updateReviewData).toBe("updateReview String")
    expect(mockReviewModel.update).toHaveBeenCalledTimes(1)
    expect(mockReviewModel.update).toHaveBeenCalledWith(
      {
        rating: updateReviewParams.rating,
        content: updateReviewParams.content,
        picture: updateReviewParams.picture,
      },
      { where: { id: updateReviewParams.id } }
    )
  });
  test('리뷰 삭제 테스트(deleteReview)', async () => {
    mockReviewModel.destroy = jest.fn(() => {
      return "deleteReview String"
    })
    const review = await reviewRepository.deleteReview()
    expect(reviewRepository.reviewModel.destroy).toHaveBeenCalledTimes(1)
    expect(review).toBe('deleteReview String')
  });

});