import { loginDao } from '../models';
import { ERROR } from '../utils/error';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();
const { secret } = process.env;

const getCategory = async (email, password) => {
  const user = await loginDao.getCategory(email);
  if (user) {
    const token = jwt.sign({ id: user[0].id }, secret, { expiresIn: '7d' });
    return token;
  } else {
    throw new error(ERROR.WRONG_INPUT);
  }
};

const verifyToken = async token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export default { getCategory, verifyToken };
