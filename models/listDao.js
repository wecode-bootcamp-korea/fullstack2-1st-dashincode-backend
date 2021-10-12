import { Prisma } from '.prisma/client';
import prisma from '../prisma';

const getProductsByCategoryId = async (depth, id) => {
  const condition = {
    main: Prisma.sql`WHERE p.main_category_id=${id}`,
    sub: Prisma.sql`WHERE p.sub_category_id=${id}`,
  };

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
    ${
      depth === 'main'
        ? condition.main
        : depth === 'sub'
        ? condition.sub
        : Prisma.empty
    }
  `;
};

const getProductsBySort = async sort => {
  const condition = {
    best: Prisma.sql`ORDER BY p.clicked DESC LIMIT 30`,
    new: Prisma.sql`ORDER BY p.created_at DESC LIMIT 30`,
    dashindelivery: Prisma.sql`WHERE (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 2) = 1
    ORDER BY p.id DESC LIMIT 30`,
    cooldelivery: Prisma.sql`WHERE (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 3) = 1
    ORDER BY p.id DESC LIMIT 30`,
    mainpage: Prisma.sql`WHERE (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) = 0
    ORDER BY p.id DESC LIMIT 30`,
  };

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
    ${
      sort === 'best'
        ? condition.best
        : sort === 'new'
        ? condition.new
        : sort === 'dashindelivery'
        ? condition.dashindelivery
        : sort === 'cooldelivery'
        ? condition.cooldelivery
        : sort === 'mainpage'
        ? condition.mainpage
        : Prisma.empty
    };
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
