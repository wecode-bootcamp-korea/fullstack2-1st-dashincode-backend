import { likeServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const getLikedProduct = wrapAsync(async (req, res) => {
  const productId = req.params.id;
  const userId = req.middleware.id;
  //미들웨어에서 담는 이름에 따라 수정해야함
  const isLiked = await likeServices.getLikedProduct(productId, userId);
  res.status(200).json({
    DATA: isLiked,
  });
});

const likeProduct = wrapAsync(async (req, res) => {
  const productId = req.params.id;
  const userId = req.middleware.id;
  //미들웨어에서 담는 이름에 따라 수정해야함
  const isLiked = await likeServices.likeProduct(productId, userId);
  res.status(200).json({
    DATA: isLiked,
  });
});

export default { getLikedProduct, likeProduct };
