import prisma from '../prisma';

const getProducts = async () => {
  const products = await prisma.$queryRaw`
  SELECT p.id, p.name p.price p.discountedPrice p.description p.storage p.shippingCompany
  FROM products as p
  `;
  return products;
};

const getProduct = async productId => {
  const id = productId;

  const [product] = await prisma.$queryRaw`
  SELECT p.id, p.name p.price p.discountedPrice p.description p.storage p.shipping_company p.created_at
  p.updated_at p.deleted_at p.is_deleted 
  FROM products as p
  where p.id=${id}`;

  return product;
}
export default { getProducts, getProduct };
