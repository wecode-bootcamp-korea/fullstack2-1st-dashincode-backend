import express from 'express';
import { productController } from '../controllers';

const router = express.Router();

router.get('/category', productController.getCategory);
router.get('/special', productController.getSpecialProduct);
router.get('/:id/nav', productController.getProductNav);
router.get('/:id/info', productController.getProductInfo);
router.get('/:id/thumbnail', productController.getProductThumbnails);
router.get('/:id/image', productController.getProductDescriptionImage);
router.get('/:id/review', productController.getProductReviewList);
router.get('/:id/like', productController.getLikedProduct);
router.post('/:id/like', productController.likeProduct);
router.delete('/:id/like', productController.unlikeProduct);

export default router;
