import express from 'express';
import { cartController } from '../controllers';

const router = express.Router();

router.get('/', cartController.getCategory);

export default router;