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
    p.shipping_company,
    p.created_at
  FROM 
    products as p
  where 
    p.id=${productId};`;

  return product;
}

const getProductDescriptionImage = async productId => {
  const descriptionImage = await prisma.$queryRaw`
  SELECT 
    d.id,
    d.image_url,
    d.product_id
  FROM 
    description_images as d
  WHERE 
    product_id = ${productId};`;
  
  return descriptionImage;
}

const getProductThumbNail = async productId => {
  const productThumbNail = await prisma.$queryRaw`
  SELECT
    t.id,
    t.image_url,
    t.is_main
  FROM
    products_thumbnails as t
  WHERE
    product_id = ${productId};`;

  return productThumbNail;
}

const getProductNavBar = async productId => {
  const ProductNavBar = await prisma.$queryRaw`
  SELECT
    main_categories.name,
    sub_categories.name
  FROM
    products 
  JOIN  
    main_categories
  ON 
    main_categories.id = products.id
  JOIN
    sub_categories
  ON
    sub_categories.id = product.id
  WHERE
    product_id = ${productId};`;
  
  return ProductNavBar;
}

const getProductShipment = async productId => {
  const productShipment = await prisma.$queryRaw`
  SELECT
    ps.id,
    ps.product_id
  FROM
    products_shipments as ps
  WHERE
    product_id = ${productId};`;

  return productShipment;
  }

  const getMainCategory = async () => {
    return await prisma.$queryRaw`
      SELECT
        id, name
      FROM
        main_categories
      ORDER BY
        id
    `;
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
      SELECT
        p.id,
        p.name,
        p.main_category_id,
        i.image_url
      FROM
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
  getProductDescriptionImage, 
  getProductThumbNail,
  getProductNavBar,
  getProductShipment, 
  getMainCategory,
  getSubCategory,
  getNewestProductOfEachCategory, 
};
