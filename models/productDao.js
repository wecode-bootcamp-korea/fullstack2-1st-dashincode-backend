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

const getProductImage = async productId => {
  const productImage = await prisma.$queryRaw`
  SELECT 
    d.id,
    d.image_url,
    d.product_id
  FROM 
    description_images as d
  WHERE 
    product_id = ${productId};`;
  
  return productImage;
}

const getProductShipment = async productId => {
  const productShipment = await prisma.$queryRaw`
  SELECT
    ps.id,
    ps.product_id,
  FROM
    products_shipments as ps
  WHERE
    product_id = ${productId};`;

  return productShipment;
  }

  const getMainCategory = async () => {
    const a = await prisma.$queryRaw`
      SELECT
        id, name
      FROM
        main_categories
      ORDER BY
        id
    `;
    console.log(a);
  };

  const getSubCategory = async mainCategoryId => {
    return await prisma.$queryRaw`
      SELECT
        id, name
      FROM
        sub_categories
      WHERE
        main_category_id = ${mainCategoryId};
    `;
  };

  const getNewestProductOfEachCategory = async mainCategoryId => {
    return await prisma.$queryRaw`
      select
        p.id,
        p.name,
        p.main_category_id,
        i.image_url
      from
        products p
      JOIN
        products_thumbnails i
      ON
        i.product_id = p.id
      WHERE
        p.main_category_id = ${mainCategoryId}
      ORDER BY
        updated_at DESC LIMIT 1
    `;
  };

export default { 
  getProductDetail, 
  getProductImage, 
  getProductShipment, 
  getMainCategory,
  getSubCategory,
  getNewestProductOfEachCategory, 
};
