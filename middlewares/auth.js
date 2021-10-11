import { loginServices } from '../services';
import { ERRORS } from '../utils/error';

export const authMiddleware = () => {
  return async (req, res, next) => {
    const { user } = req.cookies;

    if (user) {
      try {
        const userId = await loginServices.verifyToken(user);
        console.log(userId);
        if (userId) {
          const isUser = await loginServices.getCategory(userId.id);
          if (isUser) {
            req.user = user;
          }
        }
      } catch {
        res.status(401).json({ response: false, error: ERRORS.INVALID_TOKEN });
      }
    }
    next();
  };
};
