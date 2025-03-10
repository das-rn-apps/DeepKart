import express from "express";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import orderRoutes from "./order.routes";
import cartRoutes from "./cart.routes";
import categoryRoutes from "./category.routes";
import paymentRoutes from "./payment.routes";
import reviewRoutes from "./review.routes";
import sellerRoutes from "./seller.routes";


const router = express.Router();

router.use("/users", userRoutes );
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/carts', cartRoutes);
router.use('/categories', categoryRoutes);
router.use('/payments', paymentRoutes);
router.use('/reviews', reviewRoutes);
router.use('/sellers', sellerRoutes);

export default router;
