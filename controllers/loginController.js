import { loginServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';
import { ERRORS } from '../utils/error';

const getUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.user);
  try {
    const token = await loginServices.getUser(email, password);
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

export default { getUser };
