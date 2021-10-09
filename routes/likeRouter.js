import express from 'express';
import { likeController } from '../controllers';

const router = express.Router();

router.get('/', likeController.getCategory);

export default router;
