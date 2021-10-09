import { signupDao } from '../models';

const getCategory = async () => {
  return await signupDao.getCategory();
};

export default { getCategory };
