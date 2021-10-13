import { userServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';
import { ERRORS } from '../utils/error';

const getUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await userServices.getUser(email, password);
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

const insertUser = wrapAsync(async (req, res) => {
  try {
    const signupInfo = req.body;
    const signupUser = await userServices.insertUser(signupInfo);
    res.status(201).json({
      message: 'CREATED',
      signupUser,
    });
  } catch (err) {
    res.status(500).send('다른 이메일을 입력해주세요.');
  }
});

export default { getUser, insertUser };
