import { signupDao } from '../models';
import bcrypt from 'bcrypt';

const insertUser = async signupInfo => {
  const { email, password, nickname } = signupInfo;
  const [userInfo] = await signupDao.getUsersByEmail(email);

  if (!userInfo) {
    const hash = await bcrypt.hash(password, 12);
    return await signupDao.insertUser(email, hash, nickname);
  } else {
    res
      .status(500)
      .send('이미 가입된 이메일입니다. 다른 이메일을 입력해주세요.');
  }
};

export default { insertUser };
