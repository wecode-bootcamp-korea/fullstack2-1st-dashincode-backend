import { userDao } from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ERRORS } from '../utils/error';

const { secret } = process.env;

const getUser = async (email, password) => {
  try {
    const [user] = await userDao.getUser(email);
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '7d' });
        return token;
      }
    } else {
      throw new Error(ERRORS.WRONG_INPUT);
    }
  } catch (err) {
    throw err;
  }
};

const getUserById = async id => {
  try {
    if (id) {
      const userInfoById = await userDao.getUserById(id);
      return userInfoById;
    } else {
      throw new Error(ERRORS.NO_USERS);
    }
  } catch (err) {
    throw err;
  }
};

const insertUser = async signupInfo => {
  try {
    const { email, password, nickname } = signupInfo;
    const [userInfo] = await userDao.getUsersByEmail(email);

    if (!userInfo) {
      const hash = await bcrypt.hash(password, 12);
      await userDao.insertUser(email, hash, nickname);
    } else {
      throw new Error(ERRORS.EXIST_EMAIL);
    }
  } catch (err) {
    throw err;
  }
};

export default { getUser, getUserById, insertUser };
