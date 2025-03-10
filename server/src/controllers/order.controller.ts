import { Request, Response } from 'express';
import Order, { IOrder } from '../models/order.model';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: IOrder = new Order({ ...req.body, userId: req.user?.userId });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

export const getMyOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ userId: req.user?.userId }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

export const getMyOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId, userId: req.user?.userId }).populate('items.productId');
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try{
        const orders = await Order.find().populate('items.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({message: "Error fetching all orders", error});
    }
}

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, {orderStatus: req.body.orderStatus}, {new: true});
        if(!order){
            res.status(404).json({message: "Order not found"});
            return;
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({message: "error updating order status", error});
    }
}
// Add other controller functions (getOrderTracking, cancelOrder, etc.) here