import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { loginDao } from '../models';
import { ERROR } from '../utils/error';

dotenv.config();
const { secret } = process.env;

const getUser = async (email, password) => {
  const [user] = await loginDao.getUser(email);
  if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '7d' });
      return token;
    } else {
      throw new error(ERROR.WRONG_INPUT);
    }
  }
};

const getUserById = async id => {
  if (id) {
    const userInfoById = await loginDao.getUserById(id);
    return userInfoById;
  } else {
    throw new error(ERROR.NO_USERS);
  }
};

export default { getUser, getUserById };
