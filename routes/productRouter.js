import express from 'express';
import { productController } from '../controllers';


const router = express.Router();

router.get('/:id', productController.getProductDetail);
router.get('/:id', productController.getProductShipment);
router.get('/:id', productController.getProductImage);
router.get('/category', productController.getCategory);

export default router;
