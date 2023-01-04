const express = require('express');
const router = express.Router();
const authMiddleware = require("../auth-middleware/auth-middleware");

const ReviewController = require('../controllers/review.controller.js');
const reviewController = new ReviewController();

//리뷰조회(주문번호에대한리뷰조회)
router.get('/:orderId/review', reviewController.getReviewByOrderId);
router.get('/:managerId/me/review', authMiddleware, reviewController.getMyOrderReview);
//리뷰작성
router.post(':orderId/review', authMiddleware, reviewController.writeReview);

//리뷰수정
router.put('/:orderId/review/:reviewId', authMiddleware, reviewController.updateReview);

// //리뷰삭제
router.delete('/:orderId/review/:reviewId', authMiddleware, reviewController.deleteReview);



module.exports = router;
