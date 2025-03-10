import { Request, Response } from 'express';
import Seller, { ISeller } from '../models/seller.model';
import Product from '../models/product.model';
import Review from '../models/review.model';

export const createSeller = async (req: Request, res: Response): Promise<void> => {
  try {
    const seller: ISeller = new Seller(req.body);
    await seller.save();
    res.status(201).json(seller);
  } catch (error) {
    res.status(500).json({ message: 'Error creating seller', error });
  }
};

export const getSellers = async (req: Request, res: Response): Promise<void> => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sellers', error });
  }
};

export const getSellerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const seller = await Seller.findById(req.params.sellerId);
    if (!seller) {
      res.status(404).json({ message: 'Seller not found' });
      return;
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seller', error });
  }
};

export const updateSeller = async (req: Request, res: Response): Promise<void> => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.sellerId, req.body, { new: true });
    if (!seller) {
      res.status(404).json({ message: 'Seller not found' });
      return;
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: 'Error updating seller', error });
  }
};

export const deleteSeller = async (req: Request, res: Response): Promise<void> => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.sellerId);
    if (!seller) {
      res.status(404).json({ message: 'Seller not found' });
      return;
    }
    res.json({ message: 'Seller deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting seller', error });
  }
};

export const getSellerProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find({sellerId: req.params.sellerId});
        res.json(products);
    } catch (error) {
        res.status(500).json({message: "Error getting seller products", error});
    }
};

export const getSellerReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find({sellerId: req.params.sellerId});
        const reviews = await Review.find({productId: {$in: products.map(p => p._id)}}).populate('userId');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({message: "Error getting seller reviews", error});
    }
};

export const getSellerDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
        // Implementation for seller dashboard.
        res.json({message: "seller dashboard data"});
    } catch (error) {
        res.status(500).json({message: "Error getting seller dashboard", error});
    }
};