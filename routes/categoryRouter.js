import express from 'express';
import { categoryController } from '../controllers';

const router = express.Router();

router.get('/:location', categoryController.getCategory);
router.get('/:depth/:id', categoryController.getProductsForEachCategory);

export default router;
