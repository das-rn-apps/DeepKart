import express from 'express';
import { processPayment, getPaymentById, getPaymentMethods, initiateRefund, verifyPayment, getMyPayments, getAllPayments } from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, processPayment);
router.get('/:paymentId', authenticate, getPaymentById);
router.get('/methods', authenticate, getPaymentMethods);
router.post('/:paymentId/refund', authenticate, initiateRefund);
router.post('/:paymentId/verify', authenticate, verifyPayment);
router.get('/me', authenticate, getMyPayments);
router.get('/', authenticate, getAllPayments); //admin only

export default router;