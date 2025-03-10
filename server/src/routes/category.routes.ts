import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory, getChildrenCategories } from '../controllers/category.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, createCategory); // Admin only
router.get('/', getCategories);
router.get('/:categoryId', getCategoryById);
router.put('/:categoryId', authenticate, updateCategory); // Admin only
router.delete('/:categoryId', authenticate, deleteCategory); // Admin only
router.get('/:categoryId/children', getChildrenCategories);

export default router;