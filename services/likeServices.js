import { likeDao } from '../models';

const getCategory = async () => {
  return await likeDao.getCategory();
};

export default { getCategory };