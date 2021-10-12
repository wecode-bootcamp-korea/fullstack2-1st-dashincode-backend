import prisma from '../prisma';

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
    ORDER BY p.clicked DESC LIMIT 1
  `;
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
};

const getMainPageProducts = async () => {
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
    WHERE (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) = 0
    ORDER BY p.id DESC LIMIT 1
  `;
};

export default {
  getProductsForMainCategory,
  getProductsForSubCategory,
  getBestProducts,
  getNewProducts,
  getDashinDeliveryProducts,
  getCoolDeliveryProducts,
};
