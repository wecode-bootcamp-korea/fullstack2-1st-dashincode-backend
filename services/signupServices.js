import { signupDao } from '../models';
import bcrypt from 'bcrypt';

const getCategory = async (email, password, nickname) => {
  const userInfo = await signupDao.getUsersByEmailModel(email);
  const isUser = userInfo[0];

  if (!isUser) {
    const hash = await bcrypt.hash(password, 12);
    console.log(hash);
    return await signupDao.getCategory(email, hash, nickname);
  }
};

export default { getCategory };
