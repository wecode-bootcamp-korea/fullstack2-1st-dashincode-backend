import prisma from '../prisma';

const getMainCategory = async () =>
  await prisma.$queryRaw`
    SELECT
      id, name
    FROM
      main_categories
    ORDER BY
      id
  `;

const getSubCategory = async mainCategoryId =>
  await prisma.$queryRaw`
    SELECT
      id, name
    FROM
      sub_categories
    WHERE
      main_category_id = ${mainCategoryId};
  `;

const getNewestProductOfEachCategory = async mainCategoryId =>
  await prisma.$queryRaw`
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

const getSpecialProduct = async () => {
  const [specialProduct] = await prisma.$queryRaw`
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.discounted_price,
      i.image_url,
      DATE_FORMAT(DATE_ADD(p.created_at, INTERVAL 10 DAY), '%m/%d/%Y') AS expire_date
    FROM
      products p
    JOIN
      products_thumbnails i
    ON
      i.product_id = p.id
    ORDER BY
      updated_at DESC LIMIT 1
  `;
  return specialProduct;
};

const getShipmentsOfProduct = async productId =>
  await prisma.$queryRaw`
    SELECT
      s.shipment
    FROM
      shipments s
    JOIN
      products_shipments p
    ON
      p.product_id = ${productId}
    WHERE
      s.id = p.shipment_id
    ORDER BY
      s.id
  `;

const getProductNav = async productId => {
  const [productNav] = await prisma.$queryRaw`
    SELECT
      main_categories.name AS mainCategory,
      sub_categories.name AS subCategory
    FROM
      products
    JOIN
      main_categories
    ON
      main_categories.id = products.main_category_id
    JOIN
      sub_categories
    ON
      sub_categories.id = products.sub_category_id
    WHERE
      products.id = ${productId};
  `;
  return productNav;
};

const getProductInfo = async productId => {
  const [productInfo] = await prisma.$queryRaw`
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
  return productInfo;
};

const getProductShipment = async productId => {
  const productShipment = await prisma.$queryRaw`
    SELECT
      s.shipment
    FROM
      products_shipments as ps
    JOIN
      shipments s
    ON
      s.id = ps.shipment_id
    WHERE
      ps.product_id = ${productId}
    ORDER BY
      ps.shipment_id ASC
  `;
  return productShipment;
};

const getProductThumbnails = async productId => {
  const productThumbnails = await prisma.$queryRaw`
    SELECT
      t.id,
      t.image_url,
      t.is_main
    FROM
      products_thumbnails as t
    WHERE
      product_id = ${productId};`;
  return productThumbnails;
};

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
};

const getProductReviewList = async productId => {
  const reviewList = await prisma.$queryRaw`
    SELECT
      c.product_id,
      c.user_id,
      u.nickname,
      c.scores,
      c.comment,
      c.image_url
    FROM
      comments c
    JOIN
      users u
    ON
      c.user_id = u.id
    WHERE
      c.product_id = ${productId}
    ORDER BY
      c.created_at DESC
  `;
  return reviewList;
};

const getLikedProduct = async (productId, userId) => {
  const [isLiked] = await prisma.$queryRaw`
    SELECT COUNT(*) AS result
    FROM 
      likes 
    WHERE 
      product_id=${productId}
    AND
      user_id=${userId}
  `;
  return isLiked.result;
};

const addLike = async (productId, userId) => {
  return await prisma.$queryRaw`
    INSERT INTO 
      likes 
      (product_id, user_id) 
    VALUE 
      (${productId}, ${userId})
  `;
};

const deleteLike = async (productId, userId) => {
  return await prisma.$queryRaw`
    DELETE FROM
      likes 
    WHERE 
      product_id=${productId} 
    AND 
      user_id=${userId}
  `;
};

const isProduct = async productId => {
  const [isProduct] = await prisma.$queryRaw`
    SELECT COUNT(*) AS result
    FROM 
      products 
    WHERE 
      id=${productId}
  `;
  return isProduct.result;
};

export default {
  getMainCategory,
  getSubCategory,
  getNewestProductOfEachCategory,
  getSpecialProduct,
  getShipmentsOfProduct,
  getProductNav,
  getProductInfo,
  getProductShipment,
  getProductThumbnails,
  getProductDescriptionImage,
  getProductReviewList,
  getLikedProduct,
  addLike,
  deleteLike,
  isProduct,
};
