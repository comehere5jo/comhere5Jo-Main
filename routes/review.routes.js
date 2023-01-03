const express = require('express');
const router = express.Router();

const ReviewController = require('../controllers/review.controller.js');
const reviewController = new ReviewController();

//리뷰조회(주문번호에대한리뷰조회)
router.get('/:orderId/review', reviewController.getReviewByOrderId);

//리뷰작성
router.post('/:orderId/review', reviewController.writeReview);

//리뷰수정
router.put('/:orderId/review/:reviewId', reviewController.updateReview);

// //리뷰삭제
router.delete('/:orderId/review/:reviewId', reviewController.deleteReview);

//나의리뷰조회

module.exports = router;
