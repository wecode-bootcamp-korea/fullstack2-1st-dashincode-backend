import express from 'express';
import { cartController } from '../controllers';

const router = express.Router();

router.post('/:id', cartController.addCartList);
router.get('/', cartController.getCartList);
router.put('/update/:id', cartController.updateCartList);
router.delete('/:id', cartController.deleteCartList);

export default router;

