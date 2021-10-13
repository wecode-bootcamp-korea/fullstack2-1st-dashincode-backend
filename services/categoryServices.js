import { categoryDao } from '../models';

const getCategory = async () => {
  return await categoryDao.getCategory();
};

export default { getCategory };
