import { signupServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const insertUser = wrapAsync(async (req, res) => {
  try {
    const signupInfo = req.body;
    const signupUser = await signupServices.insertUser(signupInfo);
    res.status(201).json({
      message: 'CREATED',
      signupUser,
    });
  } catch (err) {
    res.status(500).send('다른 이메일을 입력해주세요.');
  }
});

export default { insertUser };
