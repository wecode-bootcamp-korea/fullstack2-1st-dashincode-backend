import { loginDao } from '../models';

const getCategory = async () => {
  return await loginDao.getCategory();
};

export default { getCategory };
