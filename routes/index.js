import express from 'express';
const router = express.Router();
import productRouter from './productRouter';
import likeRouter from './likeRouter';
import commentRouter from './commentRouter';
import cartRouter from './cartRouter';
import loginRouter from './loginRouter';
import signupRouter from './signUpRouter';
import listRouter from './listRouter';

router.use('/product', productRouter);
router.use('/like', likeRouter);
router.use('/comment', commentRouter);
router.use('/cart', cartRouter);
router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/list', listRouter);

export default router;
