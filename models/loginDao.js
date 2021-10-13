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

export default { getUser, getUserById };
