import express from 'express';
import userRouter from './userRouter';
import productRouter from './productRouter';
import listRouter from './listRouter';
import cartRouter from './cartRouter';

const router = express.Router();

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/list', listRouter);
router.use('/cart', cartRouter);

export default router;
