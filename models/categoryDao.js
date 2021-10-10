import prisma from '../prisma';

const getCategory = async () => {
  const mainCategory = await prisma.$queryRaw`
  SELECT id, name FROM main_categories ORDER BY id
  `;
  const subCategory = await prisma.$queryRaw`
    SELECT * from sub_categories;
  `;
  return [mainCategory, subCategory];
};

const getNewestProductOfEachCategory = async () => {
  await prisma.$queryRaw`SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`;
  const newestProductOfEachCategory = await prisma.$queryRaw`
    select
      p.id, 
      p.name, 
      p.main_category_id,
      i.image_url
    from(
      select
        *
      from products
      where (main_category_id, created_at) in (
        select main_category_id, max(created_at) as created_at
        from products group by main_category_id
      )
    order by updated_at desc
    ) p
    JOIN products_thumbnails i
    ON i.product_id = p.id
    group by p.main_category_id
  `;

  return newestProductOfEachCategory;
};

const getProductsForMainCategory = async id => {
  const products = await prisma.$queryRaw`
    SELECT 
      p.id, 
      p.main_category_id,
      p.sub_category_id,
      p.name, 
      i.image_url,
      p.price,
      p.discounted_price,
      p.description,
      date_format(p.created_at, '%Y-%m-%d') AS created_at,
      (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) AS reviewCount,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 1) AS isFree,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 2) AS isDashin,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 3) AS isCool,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 4) AS isBasic
    FROM products p
    JOIN products_thumbnails i
    ON i.product_id = p.id
    WHERE p.main_category_id=${id}
  `;

  return products;
};

const getProductsForSubCategory = async id => {
  const products = await prisma.$queryRaw`
    SELECT 
      p.id, 
      p.main_category_id,
      p.sub_category_id,
      p.name, 
      i.image_url,
      p.price,
      p.discounted_price,
      p.description,
      date_format(p.created_at, '%Y-%m-%d') AS created_at,
      (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) AS reviewCount,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 1) AS isFree,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 2) AS isDashin,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 3) AS isCool,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 4) AS isBasic
    FROM products p
    JOIN products_thumbnails i
    ON i.product_id = p.id
    WHERE p.sub_category_id=${id}
    `;

  return products;
};

const getBestProducts = async () => {
  const products = await prisma.$queryRaw`
    SELECT 
    p.id, 
    p.main_category_id,
    p.sub_category_id,
    p.name, 
    i.image_url,
    p.price,
    p.discounted_price,
    p.description,
    date_format(p.created_at, '%Y-%m-%d') AS created_at,
    (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) AS reviewCount,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 1) AS isFree,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 2) AS isDashin,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 3) AS isCool,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 4) AS isBasic
    FROM products p
    JOIN products_thumbnails i
    ON i.product_id = p.id
    ORDER BY p.clicked DESC LIMIT 48
  `;
  console.log(products);
  return products;
  //LIMIT 변경해야함.
  //마지막줄 order by 작동 안하는 이유는?
};

const getNewProducts = async () => {
  return await prisma.$queryRaw`
    SELECT 
    p.id, 
    p.main_category_id,
    p.sub_category_id,
    p.name, 
    i.image_url,
    p.price,
    p.discounted_price,
    p.description,
    date_format(p.created_at, '%Y-%m-%d') AS created_at,
    (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) AS reviewCount,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 1) AS isFree,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 2) AS isDashin,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 3) AS isCool,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 4) AS isBasic
    FROM products p
    JOIN products_thumbnails i
    ON i.product_id = p.id
    ORDER BY p.created_at DESC LIMIT 1
  `;
  //LIMIT 변경해야함.
};

const getDashinDeliveryProducts = async () => {
  return await prisma.$queryRaw`
    SELECT 
    p.id, 
    p.main_category_id,
    p.sub_category_id,
    p.name, 
    i.image_url,
    p.price,
    p.discounted_price,
    p.description,
    date_format(p.created_at, '%Y-%m-%d') AS created_at,
    (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) AS reviewCount,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 1) AS isFree,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 2) AS isDashin,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 3) AS isCool,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 4) AS isBasic
    FROM products p
    JOIN products_thumbnails i
    ON i.product_id = p.id
    WHERE (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 2) = 1
    ORDER BY p.id DESC LIMIT 48
  `;
  //LIMIT 변경해야함.
};

const getCoolDeliveryProducts = async () => {
  return await prisma.$queryRaw`
    SELECT 
    p.id, 
    p.main_category_id,
    p.sub_category_id,
    p.name, 
    i.image_url,
    p.price,
    p.discounted_price,
    p.description,
    date_format(p.created_at, '%Y-%m-%d') AS created_at,
    (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) AS reviewCount,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 1) AS isFree,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 2) AS isDashin,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 3) AS isCool,
    (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 4) AS isBasic
    FROM products p
    JOIN products_thumbnails i
    ON i.product_id = p.id
    WHERE (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 3) = 1
    ORDER BY p.id DESC LIMIT 48
  `;
  //LIMIT 변경해야함.
};

export default {
  getCategory,
  getNewestProductOfEachCategory,
  getProductsForMainCategory,
  getProductsForSubCategory,
  getBestProducts,
  getNewProducts,
  getDashinDeliveryProducts,
  getCoolDeliveryProducts,
};
