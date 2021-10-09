import prisma from '../prisma';

const getCategory = async () => {
  const category = await prisma.$queryRaw`
  SELECT c.id, c.name FROM categories c
  `;
  return category;
  console.log(1);
};

export default { getCategory };
