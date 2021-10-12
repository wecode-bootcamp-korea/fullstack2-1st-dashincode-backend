import express from 'express';
import { categoryController } from '../controllers';

const router = express.Router();

router.get('/:location', categoryController.getCategory);

export default router;
