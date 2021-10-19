import { userServices } from '../services';
import jwt from 'jsonwebtoken';
import { ERRORS } from '../utils/error';

const { secret } = process.env;

export const authMiddleware = () => {
  return async (req, res, next) => {
    const user = req.headers.cookie ? req.headers.cookie.split('=')[1] : '';

    if (user) {
      try {
        const userId = await verifyToken(user);
        if (userId) {
          const [isUser] = await userServices.getUserById(userId.id);
          if (isUser) {
            req.user = isUser;
          }
        } else {
          res
            .status(401)
            .json({ response: false, error: ERRORS.INVALID_TOKEN });
        }
      } catch (err) {
        throw err;
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
