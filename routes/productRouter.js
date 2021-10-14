import express from 'express';
import { productController } from '../controllers';

const router = express.Router();

// [확인!] RESTful API 설계를 위해 Product Id를 나타내는 Path Parameter의 위치를 조정
router.get('/category', productController.getCategory);
router.get('/special', productController.getSpecialProduct);
router.get('/:id/navbar', productController.getProductNavBar);
router.get('/:id/detail', productController.getProductDetail);
router.get('/:id/thumbnail', productController.getProductThumbNail);
router.get('/:id/image', productController.getProductDescriptionImage);

// comment API Test
router.get('/:id/comment', productController.getProductCommentList);

export default router;
