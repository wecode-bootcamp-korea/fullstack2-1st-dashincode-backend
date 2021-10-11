import prisma from '../prisma';

const getCategory = async email => {
  return await prisma.$queryRaw`
  SELECT * FROM users WHERE email=${email};
  `;
};

export default { getCategory };
