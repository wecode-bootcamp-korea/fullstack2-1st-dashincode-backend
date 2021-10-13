import { userServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';
import { ERRORS } from '../utils/error';

const getUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userServices.getUser(email, password);
    if (!token) {
      res.status(401).json({
        status: 'fail',
        message: ERRORS.WRONG_INPUT,
      });
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
  } catch (err) {
    throw err;
  }
});

const insertUser = wrapAsync(async (req, res) => {
  try {
    const signupInfo = req.body;
    await userServices.insertUser(signupInfo);
    res.status(201).json({
      message: 'CREATED',
      user: signupInfo.email,
    });
  } catch (err) {
    throw err;
  }
});

export default { getUser, insertUser };
