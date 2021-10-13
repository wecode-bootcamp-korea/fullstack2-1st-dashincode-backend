import prisma from '../prisma';

const getUser = async email => {
  return await prisma.$queryRaw`
  SELECT
    id, email, password, nickname
  FROM
    users
  WHERE
    email=${email};
  `;
};

const getUserById = async id => {
  return await prisma.$queryRaw`
    SELECT
      id
    FROM
      users
    WHERE
      id=${id};
  `;
};

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

export default { insertUser, getUsersByEmail, getUser, getUserById };
