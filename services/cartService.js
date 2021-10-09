import { cartDao } from '../models';

const getCategory = async () => {
  return await cartDao.getCategory();
};

export default { getCategory };
