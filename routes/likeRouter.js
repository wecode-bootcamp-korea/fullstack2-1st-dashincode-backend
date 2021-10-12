import express from 'express';
import { likeController } from '../controllers';

const router = express.Router();

router.get('/:productId', likeController.getLikedProduct);
router.post('/:productId', likeController.likeProduct);
//token validation 미들웨어 필요

export default router;
