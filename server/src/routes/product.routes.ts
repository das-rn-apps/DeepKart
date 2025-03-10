import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, createProduct); // Admin/Seller only
router.get('/', getProducts);
router.get('/:productId', getProductById);
router.put('/:productId', authenticate, updateProduct); // Admin/Seller only
router.delete('/:productId', authenticate, deleteProduct); // Admin/Seller only

// Add other routes here

export default router;