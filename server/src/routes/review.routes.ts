import express from 'express';
import { createReview, updateReview, deleteReview, getProductReviews, reportReview, approveReview, rejectReview } from '../controllers/review.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, createReview);
router.put('/:reviewId', authenticate, updateReview);
router.delete('/:reviewId', authenticate, deleteReview);
router.get('/products/:productId', getProductReviews);
router.post('/:reviewId/report', authenticate, reportReview);
router.put('/:reviewId/approve', authenticate, approveReview);
router.put('/:reviewId/reject', authenticate, rejectReview);

export default router;