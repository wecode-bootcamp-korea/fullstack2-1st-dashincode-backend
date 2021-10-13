import express from 'express';
import { likeController } from '../controllers';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.get('/:productId', authMiddleware, likeController.getLikedProduct);
router.post('/:productId', authMiddleware, likeController.likeProduct);

export default router;
