import { productDao } from '../models';

const getCategory = async () => {
  return await productDao.getCategory();
};

export default { getCategory };
