import { loginServices } from '../services';
import { ERRORS } from '../utils/error';

export const authMiddleware = () => {
  return async (req, res, next) => {
    const { user } = req.cookies;

    if (user) {
      console.log(user);
      try {
        const userId = await loginServices.verifyToken(user);
        console.log(userId);
        if (userId) {
          const isUser = await loginServices.getUser(userId.id);
          if (isUser) {
            return (req.user = user);
          }
        }
      } catch {
        res.status(401).json({ response: false, error: ERRORS.INVALID_TOKEN });
      }
    }
    next();
  };
};
