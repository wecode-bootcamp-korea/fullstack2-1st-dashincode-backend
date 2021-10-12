import prisma from '../prisma';

const getUser = async email => {
  return await prisma.$queryRaw`
  SELECT email, password FROM users WHERE email=${email};
  `;
};

export default { getUser };
