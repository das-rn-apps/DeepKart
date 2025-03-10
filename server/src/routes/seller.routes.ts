import express from 'express';
import { createSeller, getSellers, getSellerById, updateSeller, deleteSeller, getSellerProducts, getSellerReviews, getSellerDashboard } from '../controllers/seller.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, createSeller); // Admin only
router.get('/', authenticate, getSellers); // Admin only
router.get('/:sellerId', getSellerById);
router.put('/:sellerId', authenticate, updateSeller); // Admin only
router.delete('/:sellerId', authenticate, deleteSeller); // Admin only
router.get('/:sellerId/products', getSellerProducts);
router.get('/:sellerId/reviews', getSellerReviews);
router.get('/:sellerId/dashboard', authenticate, getSellerDashboard);

export default router;