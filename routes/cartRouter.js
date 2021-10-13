import express from 'express';
import { cartController } from '../controllers';

const router = express.Router();

router.post('/', cartController.addCartList);
router.get('/', cartController.getCartList);
router.put('/', cartController.updateCartList);
router.delete('/:id', cartController.deleteCartList);
router.get('/', cartController.getProductAmountInCart);

export default router;

