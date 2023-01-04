const ReviewService = require('../services/review.service.js');

class ReviewController {
  reviewService = new ReviewService();

  ////리뷰조회(주문번호에대한리뷰조회)
  getReviewByOrderId = async (req, res, next) => {
    try {
      const {orderId} = req.params;
      console.log(orderId);
      if (!orderId) {
        res.status(400).json({errorMessage: 'An orderId is required'});
        return;
      }

      const review = await this.reviewService.findReviewByOrderId(orderId);
      res.status(200).json({review});
    } catch (error) {
      // Handle any errors that may occur
      res.status(500).json({errorMessage: error.message});
    }
  };

  //리뷰작성
  writeReview = async (req, res, next) => {
    try {
      const customerId = req.customer.id;
      const {rating, content, picture} = req.body;
      const {orderId} = req.params;
      if (!rating || !content || !picture || !orderId) {
        throw new Error('내용을 입력하세요.');
      }

      const writeReviewData = await this.reviewService.writeReview(
          rating,
          content,
          picture,
          orderId,
          customerId
      );

      res.status(201).json({data: writeReviewData});
    } catch (error) {
      res.status(400).json({errorMessage: error.message});
    }
  };

  //리뷰수정
  updateReview = async (req, res, next) => {
    try {
      const id = req.params.reviewId;

      const {rating, content, picture} = req.body;

      const updatedReview = await this.reviewService.updateReview(
          id,
          rating,
          content,
          picture,
      );
      console.log('컨트롤러', updatedReview)


      res.status(200).json({data: updatedReview});
    } catch (error) {
      res.status(500).json({errorMessage: error.message});
    }
  };

  //리뷰삭제
  deleteReview = async (req, res, next) => {
    try {
      const id = req.params.reviewId;

      await this.reviewService.deleteReview(id);

      res.status(201).json({Message: '삭제가 성공했습니다.'}); // No Content
    } catch (error) {
      next(error);
    }
  };

  //사장님이 본인이 처리한 주문에 대한 리뷰 조회
  getMyOrderReview = async (req, res, next) => {
    const {managerId} = req.params;
    const getMyOrderReview = await this.reviewService.getMyOrderReview(managerId);
    res.status(200).json({data: getMyOrderReview})
  }
}

module.exports = ReviewController;

//내가 작성한 리뷰조회 (나의 주문에 대한 리뷰보기)
//   getReviewByCustomerId = async (req, res, next) => {
//     const { customerId } = req.headers;
//     const reviews = await this.reviewService.findReviewByCustomerId(customerId);

//     res.status(200).json({ data: reviews });
//   };
