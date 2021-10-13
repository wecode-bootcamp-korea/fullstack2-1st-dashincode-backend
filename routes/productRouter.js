import express from 'express';
import { productController } from '../controllers';

const router = express.Router();

router.get('/detail/:id', productController.getProductDetail);
router.get('/image/:id', productController.getProductDescriptionImage);
router.get('/thumbnail/:id', productController.getProductThumbNail);
router.get('/navbar/:id', productController.getProductNavBar);
router.get('/category', productController.getCategory);
router.get('/special', productController.getSpecialProduct);

export default router;
