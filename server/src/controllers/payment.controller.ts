import { Request, Response } from 'express';
import Payment, { IPayment } from '../models/payment.model';

export const processPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const payment: IPayment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error });
  }
};

export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const payment = await Payment.findById(req.params.paymentId);
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment', error });
  }
};

export const getPaymentMethods = async (req: Request, res: Response): Promise<void> => {
    try {
        res.json(['credit_card', 'paypal', 'stripe']); //example
    } catch (error) {
        res.status(500).json({message: "Error getting payment methods", error});
    }
};

export const initiateRefund = async (req: Request, res: Response): Promise<void> => {
    try {
        //implementation for initiating refund.
        res.json({message: "refund initiated"});
    } catch (error) {
        res.status(500).json({message: "Error initiating refund", error});
    }
};

export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        // implementation for verifying payment.
        res.json({message: "payment verified"});
    } catch (error) {
        res.status(500).json({message: "Error verifying payment", error});
    }
};

export const getMyPayments = async (req: Request, res: Response): Promise<void> => {
    try{
        const payments = await Payment.find({userId: req.user?.userId});
        res.json(payments);
    } catch(error){
        res.status(500).json({message: "Error getting user payments", error});
    }
}

export const getAllPayments = async (req: Request, res: Response): Promise<void> => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({message: "Error getting all payments", error});
    }
}