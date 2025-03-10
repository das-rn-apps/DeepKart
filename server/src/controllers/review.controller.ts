import { Request, Response } from 'express';
import Review, { IReview } from '../models/review.model';
import Product from '../models/product.model';

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review: IReview = new Review({ ...req.body, userId: req.user?.userId });
    await review.save();

    await Product.findByIdAndUpdate(req.body.productId, {$push: {reviews: review._id}});

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error });
  }
};

export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findOneAndUpdate({ _id: req.params.reviewId, userId: req.user?.userId }, req.body, { new: true });
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error });
  }
};

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.reviewId, userId: req.user?.userId });
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }
    await Product.findByIdAndUpdate(review.productId, {$pull: {reviews: review._id}});
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};

export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate('userId');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product reviews', error });
  }
};

export const reportReview = async (req: Request, res: Response): Promise<void> => {
    try {
        // Implementation for reporting review.
        res.json({message: "review reported"});
    } catch (error) {
        res.status(500).json({message: "Error reporting review", error});
    }
};

export const approveReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.reviewId, {approved: true}, {new: true});
        res.json(review);
    } catch (error) {
        res.status(500).json({message: "Error approving review", error});
    }
};

export const rejectReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.reviewId, {approved: false}, {new: true});
        res.json(review);
    } catch (error) {
        res.status(500).json({message: "Error rejecting review", error});
    }
};