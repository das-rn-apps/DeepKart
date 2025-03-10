import express from 'express';
import { getMyCart, addItemToCart, updateCartItemQuantity, removeItemFromCart, clearCart } from '../controllers/cart.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/me', authenticate, getMyCart);
router.post('/me/items', authenticate, addItemToCart);
router.put('/me/items/:productId', authenticate, updateCartItemQuantity);
router.delete('/me/items/:productId', authenticate, removeItemFromCart);
router.delete('/me', authenticate, clearCart);

export default router;