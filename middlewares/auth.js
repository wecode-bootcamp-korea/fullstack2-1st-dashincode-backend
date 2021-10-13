import { loginServices } from '../services';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { ERRORS } from '../utils/error';

dotenv.config();
const { secret } = process.env;

export const authMiddleware = () => {
  return async (req, res, next) => {
    const { user } = req.cookies;
    if (user) {
      try {
        const userId = await verifyToken(user);
        if (userId) {
          const [isUser] = await loginServices.getUserById(userId.id);
          if (isUser) {
            req.user = isUser;
          }
        }
      } catch {
        res.status(401).json({ response: false, error: ERRORS.INVALID_TOKEN });
      }
    }
    next();
  };
};

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
};
