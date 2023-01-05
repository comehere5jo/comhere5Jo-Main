const { fn } = require('sequelize');
const ReviewService = require('../../services/review.service')

let mockReviewRepository = {
  findReviewByOrderId: jest.fn(),
  findById: jest.fn(),
  findReviewOrderId: jest.fn(),
  getMyOrderReview: jest.fn(),
  writeReview: jest.fn(),
  updateReview: jest.fn(),
  deleteReview: jest.fn(),
  managerReviewUpdate: jest.fn(),
}
let reviewService = new ReviewService();
reviewService.reviewRepository = mockReviewRepository;

describe('Layered Architecture Pattern Posts Service Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })
  test('Review Service findReviewByOrderId Method', async () => {
    const findReviewByOrderIdReturnValue =
    {
      id: 1,
      rating: 4,
      content: "Title_1",
      picture: 'url',
      orderId: 1,
      customerId: 1,
      createdAt: new Date('07 October 2011 15:50 UTC'),
      updatedAt: new Date('07 October 2011 15:50 UTC'),
    }

    mockReviewRepository.findReviewByOrderId = jest.fn(() => {
      return findReviewByOrderIdReturnValue
    })

    const review = await reviewService.findReviewByOrderId();

    expect(review).toStrictEqual(
      findReviewByOrderIdReturnValue
    );

    expect(mockReviewRepository.findReviewByOrderId).toHaveBeenCalledTimes(1);

  });
  test('리뷰생성테스트', async () => {
    const writeManagerParams = {
      rating: "writeReviewRating",
      content: "writeReviewContent",
      picture: "writeReviewPicture",
      orderId: "writeReviewOrderId",
    }
    const writeReviewValue = {
      id: 1,
      rating: writeManagerParams.rating,
      content: writeManagerParams.content,
      picture: writeManagerParams.picture,
      oredrId: writeManagerParams.orderId,
      customerId: 2,
      createdAt: new Date('07 October 2011 15:50 UTC'),
      updatedAt: new Date('07 October 2011 15:50 UTC'),
    }
    mockReviewRepository.writeReview = jest.fn(() => {
      return writeReviewValue
    })
    const writeReviewData = await mockReviewRepository.writeReview(
      writeManagerParams.rating,
      writeManagerParams.content,
      writeManagerParams.picture,
      writeManagerParams.orderId,
    )

    expect(writeReviewData).toEqual(writeReviewValue)
    expect(mockReviewRepository.writeReview).toHaveBeenCalledTimes(1);
    expect(mockReviewRepository.writeReview).toHaveBeenCalledWith(
      writeManagerParams.rating,
      writeManagerParams.content,
      writeManagerParams.picture,
      writeManagerParams.orderId,);
  });
  test('리뷰 수정 테스트', async () => {

    const updateManagerParams = {
      id: "writeReviewId",
      rating: "writeReviewRating",
      content: "writeReviewContent",
      picture: "writeReviewPicture",
    }
    const updateManagerValue = {
      id: updateManagerParams.id,
      rating: updateManagerParams.rating,
      content: updateManagerParams.content,
      picture: updateManagerParams.picture,
      updatedAt: new Date('07 October 2011 15:50 UTC'),
    }
    mockReviewRepository.updateReview = jest.fn(() => {
      return updateManagerValue
    })
    const updateManagerData = await mockReviewRepository.updateReview(
      updateManagerParams.id,
      updateManagerParams.rating,
      updateManagerParams.content,
      updateManagerParams.picture,
    )
    expect(updateManagerData).toEqual(updateManagerValue)

    expect(mockReviewRepository.updateReview).toHaveBeenCalledTimes(1);
    expect(mockReviewRepository.updateReview).toHaveBeenCalledWith(
      updateManagerParams.id,
      updateManagerParams.rating,
      updateManagerParams.content,
      updateManagerParams.picture,);
  });
  test('리뷰 수정 에러 테스트', async () => {
    const writeManagerParams = {
      rating: "writeReviewRating",
      content: "writeReviewContent",
      picture: "writeReviewPicture",
      orderId: "writeReviewOrderId",
    }
    const writeReviewValue = null
    mockReviewRepository.writeReview = jest.fn(() => {
      return writeReviewValue
    })
    try {
      const writeReviewData = await mockReviewRepository.writeReview(
        writeManagerParams.rating,
        writeManagerParams.content,
        writeManagerParams.picture,
        writeManagerParams.orderId,
      )
    }
    catch (error) {
      expect(mockReviewRepository.writeReview).toHaveBeenCalledTimes(1);
      expect(mockReviewRepository.writeReview).toHaveBeenCalledWith(
        writeManagerParams.rating,
        writeManagerParams.content,
        writeManagerParams.picture,
        writeManagerParams.orderId,);
      expect(error.message).toEqual("Review doesn't exist")
      console.log('12314', error.message)
    }


  });
  test('리뷰 삭제 테스트', async () => {
    const deleteeReviewFindByIdValue = {
      id: 1,
      createdAt: new Date('07 October 2011 15:50 UTC'),
      updatedAt: new Date('07 October 2011 15:50 UTC'),
    }
    mockReviewRepository.findById = jest.fn(() => {
      return deleteeReviewFindByIdValue
    })
    const deleteReview = await reviewService.deleteReview(1)
    expect(mockReviewRepository.findById ).toHaveBeenCalledTimes(1);
    expect(mockReviewRepository.findById ).toHaveBeenCalledWith(deleteeReviewFindByIdValue.id);

    expect(mockReviewRepository.deleteReview).toHaveBeenCalledTimes(1);
    expect(mockReviewRepository.deleteReview).toHaveBeenCalledWith(deleteeReviewFindByIdValue.id);
    expect(deleteReview).toEqual({
      id: deleteeReviewFindByIdValue.id,
      rating: deleteeReviewFindByIdValue.rating,
      content: deleteeReviewFindByIdValue.content,
      picture: deleteeReviewFindByIdValue.picture,
      comment: deleteeReviewFindByIdValue.comment,
      status: deleteeReviewFindByIdValue.status,
      createdAt: deleteeReviewFindByIdValue.createdAt,
      updatedAt: deleteeReviewFindByIdValue.updatedAt,
      oredrId: deleteeReviewFindByIdValue.oredrId,
      customerId: deleteeReviewFindByIdValue.customerId,
      managerId: deleteeReviewFindByIdValue.managerId
    })
  });
  test('리뷰 삭제 오류 테스트', async () => {
    const deleteeReviewFindByIdValue = null
    mockReviewRepository.findById = jest.fn(() => {
      return deleteeReviewFindByIdValue
    })
    try{
    const Reviewdelete = await reviewService.deleteReview(1)
    }
    catch(error){
    expect(mockReviewRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockReviewRepository.findById).toHaveBeenCalledWith(1);
    expect(error.message).toEqual("Order doesn't exist")
  }
  });
  test('주문 한건에 대한 리뷰 보기', async () => {
    const findReviewByOrderIdReturnValue =
    {
      orderId: 1,
      id: 1,
      rating: 4,
      // comment:'134',
      content: "Title_1",
      picture: 'url',
      customerId: 1,
      createdAt: new Date('07 October 2011 15:50 UTC'),
      updatedAt: new Date('07 October 2011 15:50 UTC'),
      // status:1
    }
    
    mockReviewRepository.findReviewByOrderId = jest.fn(() => {
      return findReviewByOrderIdReturnValue
    })

    const review = await reviewService.findReviewByOrderId();

    expect(review).toEqual(
      findReviewByOrderIdReturnValue
    );

    expect(mockReviewRepository.findReviewByOrderId).toHaveBeenCalledTimes(1);
  });
  test('사장이 자기 주문에 대한 리뷰보기', async () => {
    const findReviewManagerIdReturnValue =
    [{
      orderId: "order.orderId",
        createdAt: "order.createdAt",
        comment: "order.comment",
        content: "order.content",
        rating: "order.rating",
        status: "order.status"
    }]
    
    mockReviewRepository.findReviewManagerId = jest.fn(() => {
      return findReviewManagerIdReturnValue
    })

    const review = await reviewService.getMyOrderReview(1);
    expect(review).toStrictEqual(findReviewManagerIdReturnValue);
    expect(mockReviewRepository.findReviewManagerId).toHaveBeenCalledTimes(1);
  });
})