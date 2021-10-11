import { loginServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';
import { ERRORS } from '../utils/error';

const getCategory = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await loginServices.getCategory(email, password);
    if (!token) {
      res.status(401).send(ERRORS.WRONG_INPUT);
    } else {
      res.cookie('user', token, {
        httpOnly: true,
        secure: false,
      });
      return res.status(200).json({
        message: 'SUCCESS',
        token,
      });
    }
  } catch (error) {
    res.status(500).send(ERRORS.WRONG_INPUT);
  }
});

export default { getCategory };
