import prisma from '../prisma';



const getProductDetail = async productId => {

  const [product] = await prisma.$queryRaw`
  SELECT 
    p.id,
    p.name,
    p.price,
    p.discounted_price,
    p.description,
    p.storage,
    p.sub_category_id,
    p.shipping_company,
    p.created_at,
    p.clicked
  FROM 
    products as p
  where 
    p.id=${productId};`;

  return product;
}

const isProductImage = async productId => {

  const productImages = await prisma.$queryRaw`
  SELECT * FROM description_images
  WHERE 
  product_id = ${productId};`;
  
  return productImages;

}
export default { getProductDetail, isProductImage };
