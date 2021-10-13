import { likeDao } from '../models';

const getLikedProduct = async (productId, userId) => {
  return await likeDao.getLikedProduct(productId, userId);
};

const likeProduct = async (productId, userId) => {
  const isLiked = await likeDao.getLikedProduct(productId, userId);
  if (!isLiked) {
    const isProduct = await likeDao.isProduct(productId);
    if (!isProduct) {
      const err = new Error('PRODUCT_NOT_EXIST');
      err.status = 401;
      throw err;
    }
    await likeDao.addLike(productId, userId);
    return true;
  } else {
    await likeDao.deleteLike(productId, userId);
    return false;
  }
};

export default { getLikedProduct, likeProduct };
