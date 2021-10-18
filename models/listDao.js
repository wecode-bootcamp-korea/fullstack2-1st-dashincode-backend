import { Prisma } from '.prisma/client';
import prisma from '../prisma';

const getProductsByCategoryId = async (depth, id) => {
  let query = '';
  if (depth === 'main') query = Prisma.sql`WHERE p.main_category_id=${id}`;
  if (depth === 'sub') query = Prisma.sql`WHERE p.sub_category_id=${id}`;

  return await prisma.$queryRaw`
    SELECT 
      p.id, 
      p.main_category_id,
      p.sub_category_id,
      p.name, 
      p.price,
      p.discounted_price,
      p.description,
      date_format(p.created_at, '%Y-%m-%d') AS created_at,
      i.image_url,
      (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) AS reviewCount
    FROM 
      products p
    JOIN 
      products_thumbnails i
    ON 
      i.product_id = p.id
    AND
      i.is_main = 1
    ${query}
  `;
};

const getProductsBySort = async sort => {
  let query = '';
  if (sort === 'best') query = Prisma.sql`ORDER BY p.clicked DESC LIMIT 30`;
  if (sort === 'new') query = Prisma.sql`ORDER BY p.created_at DESC LIMIT 30`;
  if (sort === 'dashindelivery')
    query = Prisma.sql`WHERE (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 2) = 1
    ORDER BY p.id DESC LIMIT 30`;
  if (sort === 'cooldelivery')
    query = Prisma.sql`WHERE (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 1) = 1
    ORDER BY p.id DESC LIMIT 30`;
  if (sort === 'mainpage')
    query = Prisma.sql`WHERE (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) > 0
    ORDER BY p.id DESC LIMIT 30`;

  return await prisma.$queryRaw`
    SELECT 
      p.id, 
      p.main_category_id,
      p.sub_category_id,
      p.name, 
      p.price,
      p.discounted_price,
      p.description,
      date_format(p.created_at, '%Y-%m-%d') AS created_at,
      i.image_url,
      (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) AS reviewCount
    FROM 
      products p
    JOIN 
      products_thumbnails i
    ON 
      i.product_id = p.id
    AND
      i.is_main = 1
    ${query}
  `;
};

const getSearchedProducts = async value => {
  return await prisma.$queryRaw`
    SELECT 
      p.id, 
      p.main_category_id,
      p.sub_category_id,
      p.name, 
      p.price,
      p.discounted_price,
      p.description,
      date_format(p.created_at, '%Y-%m-%d') AS created_at,
      i.image_url,
      (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) AS reviewCount
    FROM 
      products p
    JOIN 
      products_thumbnails i
    ON 
      i.product_id = p.id
    AND
      i.is_main = 1
    WHERE 
      p.name 
    LIKE 
      CONCAT("%",${value},"%")
    ORDER BY 
      p.id
  `;
};

const getShipmentsOfProduct = async productId => {
  return await prisma.$queryRaw`
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
};

export default {
  getProductsByCategoryId,
  getProductsBySort,
  getSearchedProducts,
  getShipmentsOfProduct,
};
