import { signupServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const getCategory = wrapAsync(async (req, res) => {
  const { email, password, nickname } = req.body;
  const signupUser = await signupServices.getCategory(
    email,
    password,
    nickname
  );
  res.status(201).json({
    message: 'CREATED',
    user: signupUser,
  });
});

export default { getCategory };
