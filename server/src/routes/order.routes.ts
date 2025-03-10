import express from 'express';
import { createOrder, getMyOrders, getMyOrderById, getOrders, updateOrderStatus } from '../controllers/order.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/me', authenticate, getMyOrders);
router.get('/me/:orderId', authenticate, getMyOrderById);
router.get('/', authenticate, getOrders); //admin only
router.put('/:orderId/status', authenticate, updateOrderStatus); //admin or seller
// Add other routes here

export default router;