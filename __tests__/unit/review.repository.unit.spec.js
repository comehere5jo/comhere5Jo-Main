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

  test('Review Repository findReviewByOrderId Method', async () => {
    mockReviewModel.findOne = jest.fn(() => {
      return "findOne String"
    })
    const review = await reviewRepository.findReviewByOrderId()
    expect(reviewRepository.reviewModel.findOne).toHaveBeenCalledTimes(1)
    expect(review).toBe('findOne String')

  });

  test('Review Repository findById Method', async () => {
    mockReviewModel.findByPk = jest.fn(() => {
      return "findByPk String"
    })
    const review = await reviewRepository.findById()
    expect(reviewRepository.reviewModel.findByPk).toHaveBeenCalledTimes(1)
    expect(review).toBe('findByPk String')

  });

  test('Review Repository findReviewOrderId Method', async () => {
    mockReviewModel.findByPk = jest.fn(() => {
      return "findReviewOrderId String"
    })
    const review = await reviewRepository.findById()
    expect(reviewRepository.reviewModel.findByPk).toHaveBeenCalledTimes(1)
    expect(review).toBe('findReviewOrderId String')

  });
  test('Review Repository findReviewManagerId Method', async () => {
    mockReviewModel.findAll = jest.fn(() => {
      return "findReviewManagerId String"
    })
    const review = await reviewRepository.findReviewManagerId()
    expect(reviewRepository.reviewModel.findAll).toHaveBeenCalledTimes(1)
    expect(review).toBe('findReviewManagerId String')

  });

  test('Review Repository writeReview Method', async () => {
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
  test('Review Repository updateReview Method', async () => {
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
      {rating:updateReviewParams.rating,
      content:updateReviewParams.content,
      picture:updateReviewParams.picture,},
      {where:{id:updateReviewParams.id}}
    )
  });
  test('Review Repository deleteReview Method', async () => {
    mockReviewModel.destroy = jest.fn(() => {
      return "deleteReview String"
    })
    const review = await reviewRepository.deleteReview()
    expect(reviewRepository.reviewModel.destroy).toHaveBeenCalledTimes(1)
    expect(review).toBe('deleteReview String')
  });
  test('Review Repository managerReviewUpdate Method', async () => {
    mockReviewModel.update = jest.fn(() => {
      return "managerReviewUpdate String"
    })
    const managerReviewUpdateParams = {
      managerId: "managerReviewUpdateManagerId",
      comment: "managerReviewUpdateComment",
      id: "managerReviewUpdateid"
    }
    const managerReviewUpdateData = await reviewRepository.managerReviewUpdate(
      managerReviewUpdateParams.id,
      managerReviewUpdateParams.managerId,
      managerReviewUpdateParams.comment,
    )
    expect(managerReviewUpdateData).toBe('managerReviewUpdate String')
    expect(reviewRepository.reviewModel.update).toHaveBeenCalledTimes(1)
    expect(mockReviewModel.update).toHaveBeenCalledWith({
      managerId: managerReviewUpdateParams.managerId,
      comment: managerReviewUpdateParams.comment,
    },
      { where: { id: managerReviewUpdateParams.id } }
    )
  });
});