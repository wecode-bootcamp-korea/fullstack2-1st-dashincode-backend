import prisma from '../prisma';

const getUsersByEmailModel = async email => {
  console.log(email);
  return await prisma.$queryRaw`
    SELECT * FROM users WHERE email=${email};
  `;
};

const getCategory = async (email, password, nickname) => {
  console.log(email, password, nickname);
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

export default { getCategory, getUsersByEmailModel };
