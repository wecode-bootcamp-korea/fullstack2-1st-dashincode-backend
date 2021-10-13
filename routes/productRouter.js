import express from 'express';
import { productController } from '../controllers';


const router = express.Router();

router.get('/detail/:id', productController.getProductDetail);
router.get('/shipment/:id', productController.getProductShipment);
router.get('/image/:id', productController.getProductImage);
router.get('/category', productController.getCategory);

export default router;
