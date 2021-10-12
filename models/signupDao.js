import prisma from '../prisma';

const getUsersByEmail = async email => {
  return await prisma.$queryRaw`
    SELECT email from users WHERE email=${email};
  `;
};

const insertUser = async (email, password, nickname) => {
  return await prisma.$queryRaw`
    INSERT INTO
      users (
        email,
        password,
        nickname
      )
      VALUES (
        ${email},
        ${password},
        ${nickname}
      )
    `;
};

export default { insertUser, getUsersByEmail };
