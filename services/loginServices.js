import bcrypt from 'bcrypt';
import { loginDao } from '../models';
import { ERROR } from '../utils/error';

const getUser = async (email, password) => {
  const [user] = await loginDao.getUser(email);
  if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      return user;
    } else {
      throw new error(ERROR.WRONG_INPUT);
    }
  }
};

export default { getUser };
