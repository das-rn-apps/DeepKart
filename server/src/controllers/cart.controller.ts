import { Request, Response } from 'express';
import Cart from '../models/cart.model';

export const getMyCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const cart = await Cart.findOne({ userId: req.user?.userId }).populate('items.productId');
    if (!cart) {
      res.json({ userId: req.user?.userId, items: [] });
      return;
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};

export const addItemToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user?.userId });
    if (!cart) {
      cart = new Cart({ userId: req.user?.userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};

export const updateCartItemQuantity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user?.userId, 'items.productId': productId },
      { $set: { 'items.$.quantity': quantity } },
      { new: true }
    ).populate('items.productId');
    if (!cart) {
      res.status(404).json({ message: 'Cart or item not found' });
      return;
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item quantity', error });
  }
};

export const removeItemFromCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user?.userId },
      { $pull: { items: { productId } } },
      { new: true }
    ).populate('items.productId');
    if (!cart) {
      res.status(404).json({ message: 'Cart or item not found' });
      return;
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

export const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user?.userId },
      { $set: { items: [] } },
      { new: true }
    );
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
};