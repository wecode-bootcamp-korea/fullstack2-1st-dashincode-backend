import express from 'express';
import { commentController } from '../controllers';

const router = express.Router();

router.get('/', commentController.getCategory);

export default router;
