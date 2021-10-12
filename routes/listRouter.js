import express from 'express';
import { listController } from '../controllers';

const router = express.Router();

router.get('/:depth/:id', listController.getProductsForEachCategory);
router.get('/:sort', listController.getCategorizedProducts);

export default router;
