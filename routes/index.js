import express from 'express';
const router = express.Router();
import productRouter from './productRouter';
import likeRouter from './likeRouter';
import userRouter from './userRouter';
import commentRouter from './commentRouter';
import cartRouter from './cartRouter';

import listRouter from './listRouter';

router.use('/product', productRouter);
router.use('/like', likeRouter);
router.use('/comment', commentRouter);
router.use('/cart', cartRouter);
router.use('/user', userRouter);
router.use('/list', listRouter);

export default router;
