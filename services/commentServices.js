import { commentDao } from '../models';

const getCategory = async () => {
  return await commentDao.getCategory();
};

export default { getCategory };
