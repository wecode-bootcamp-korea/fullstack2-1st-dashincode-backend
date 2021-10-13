import { likeServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const getLikedProduct = wrapAsync(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const isLiked = await likeServices.getLikedProduct(productId, userId);
  res.status(200).json({
    DATA: isLiked,
  });
});

const likeProduct = wrapAsync(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const isLiked = await likeServices.likeProduct(productId, userId);
  res.status(200).json({
    DATA: isLiked,
  });
});

export default { getLikedProduct, likeProduct };
