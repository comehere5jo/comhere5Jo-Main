const { fn } = require('sequelize');
const ReviewController = require('../../controllers/review.controller');

let mockReviewService = {
  findReviewByOrderId: jest.fn(),
  getOrderReview: jest.fn(),
  getMyOrderReview: jest.fn(),
  writeReview: jest.fn(),
  updateReview: jest.fn(),
  deleteReview: jest.fn(),
  getReviewByOrderId: jest.fn()
};

let mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
  reviewId: jest.fn(),
  customer: jest.fn(),
  manager: jest.fn()
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  render: jest.fn(),
};

let reviewController = new ReviewController();
reviewController.reviewService = mockReviewService;

describe('3계층 아키텍처 패턴 리뷰 컨트롤러 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    mockRequest.params = jest.fn(() => {
      return mockRequest
    })
  });

  test('사장 주문 리뷰 조회 테스트 (getMyOrderReview)', async () => {
    const getReviewByOrderIdValue = [
      {
        id: 1,
        rating: "레이팅",
        content: "콘텐트",
        picture: "픽쳐",
        orderId: 1,
        customerId: "커스토머아이디",
        createdAt: "크리에이티드엣",
        updatedAt: "업데이트엣",
      },
      {
        id: 2,
        rating: "레이팅",
        content: "콘텐트",
        picture: "픽쳐",
        orderId: 1,
        customerId: "커스토머아이디",
        createdAt: "크리에이티드엣",
        updatedAt: "업데이트엣",
      }
    ];
    mockRequest.manager = {id:1}
    mockReviewService.getMyOrderReview = jest.fn(() => {
      return getReviewByOrderIdValue;
    });

    await reviewController.getMyOrderReview(mockRequest, mockResponse);
    expect(mockReviewService.getMyOrderReview).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test('리뷰 작성 테스트 (writeReview)', async () => {
    const writeReviewBodyParams = {
      rating: "writeReviewRating",
      content: "writeReviewContent",
      picture: "writeReviewPicture",
    }
    const writeReviewParams = {
      orderId: "writeReviewOrderId",
    }
    mockRequest.customer = { id :1}
    mockRequest.body = { rating:1, content:1, picture:1 }
    mockRequest.params = { orderId:1 }

    const writeReviewValue = {
      rating: writeReviewBodyParams.rating,
      content: writeReviewBodyParams.content,
      picture: writeReviewBodyParams.picture,
      oredrId: writeReviewParams.orderId,
      createdAt: new Date('07 October 2011 15:50 UTC'),
      updatedAt: new Date('07 October 2011 15:50 UTC'),
    }
    mockReviewService.writeReview = jest.fn(() => {
      return writeReviewValue
    })
    const writeReviewData = 1111
    mockReviewService.writeReview = jest.fn(() => {
      return writeReviewData
    })
    await reviewController.writeReview(mockRequest, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockReviewService.writeReview).toHaveBeenCalledTimes(1);

  });

  test('리뷰 수정 테스트(updateReview)', async () => {
    const bodyParams = {
      rating: "writeReviewRating",
      content: "writeReviewContent",
      picture: "writeReviewPicture",
    }
    const params = {
      reviewId: "writeReviewreviewId",
    }
    mockRequest.body = bodyParams
    mockRequest.params.reviewId = params

    const writeReviewValue = {
      id: params.reviewId,
      rating: bodyParams.rating,
      content: bodyParams.content,
      picture: bodyParams.picture,
      createdAt: new Date('07 October 2011 15:50 UTC'),
      updatedAt: new Date('07 October 2011 15:50 UTC'),
    }
    mockReviewService.updateReview = jest.fn(() => {
      return writeReviewValue
    })

    await reviewController.updateReview(mockRequest, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockReviewService.updateReview).toHaveBeenCalledTimes(1);

  });

  test('리뷰 삭제 테스트(deleteReview)', async () => {

    mockRequest.params = {reviewId:1}

    mockReviewService.deleteReview = jest.fn(() =>{
    })

    await reviewController.deleteReview(mockRequest, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockReviewService.deleteReview).toHaveBeenCalledTimes(1);
  });
});