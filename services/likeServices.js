import { likeDao } from '../models';

const getLike = async (productId, userId) => {
  if (!productId) {
    const err = new Error('PRODUCT_NOT_EXIST');
    err.status = 401;
    throw err;
  }
  return await likeDao.getLike(productId, userId);
};

const likeProduct = async (productId, userId) => {
  if (!productId) {
    const err = new Error('PRODUCT_NOT_EXIST');
    err.status = 401;
    throw err;
  }
  const isLiked = await likeDao.getLike(productId, userId);
  if (!isLiked) {
    await likeDao.addLike(productId, userId);
    return true;
  } else {
    await likeDao.deleteLike(productId, userId);
    return false;
  }
};

export default { getLike, likeProduct };
