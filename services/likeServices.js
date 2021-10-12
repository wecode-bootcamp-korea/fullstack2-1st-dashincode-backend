import { likeDao } from '../models';

const getLike = async (productId, userId) => {
  return await likeDao.getLike(productId, userId);
};

<<<<<<< HEAD
const likeProduct = async (productId, userId) => {
  const isLiked = await likeDao.getLike(productId, userId);
  if (!isLiked) {
    await likeDao.likeProduct(productId, userId);
    return true;
  } else {
    await likeDao.dislikeProduct(productId, userId);
    return false;
  }
};

export default { getLike, likeProduct };
=======
export default { getCategory };
>>>>>>> main
