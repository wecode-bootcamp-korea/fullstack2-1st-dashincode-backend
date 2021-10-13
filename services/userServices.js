import { userDao } from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { ERROR } from '../utils/error';

dotenv.config();
const { secret } = process.env;

const getUser = async (email, password) => {
  const [user] = await userDao.getUser(email);
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
    const userInfoById = await userDao.getUserById(id);
    return userInfoById;
  } else {
    throw new error(ERROR.NO_USERS);
  }
};

const insertUser = async signupInfo => {
  const { email, password, nickname } = signupInfo;
  const [userInfo] = await userDao.getUsersByEmail(email);

  if (!userInfo) {
    const hash = await bcrypt.hash(password, 12);
    return await userDao.insertUser(email, hash, nickname);
  } else {
    res
      .status(500)
      .send('이미 가입된 이메일입니다. 다른 이메일을 입력해주세요.');
  }
};

export default { getUser, getUserById, insertUser };
