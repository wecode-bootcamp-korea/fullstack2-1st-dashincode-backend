import { wrapAsync } from '../utils/wrapAsync';
import { validationResult } from 'express-validator';

const userValidation = wrapAsync(async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  } catch (err) {
    throw err;
  }
});

export default userValidation;
