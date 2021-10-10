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
  const newestProductOfEachCategory = await prisma.$queryRaw`
    select
      p.id, 
      p.name, 
      main_category_id,
      i.image_url
    from(
      select
        *
      from products
      where (main_category_id, updated_at) in (
        select main_category_id, max(updated_at) as updated_at
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

const getProductsForMainCategory = async () => {
  const products = await prisma.$queryRaw`
    SELECT 
      p.id, 
      p.main_category_id,
      p.name, 
      i.image_url,
      p.price,
      p.discounted_price,
      p.description,
      p.created_at,
      (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) AS reviewCount,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 1) AS isFree,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 2) AS isDashin,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 3) AS isCool,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 4) AS isBasic
    FROM products p
    JOIN products_thumbnails i
    ON i.product_id = p.id
    WHERE p.main_category_id=1
  `;

  return products;
};

const getProductsForSubCategory = async () => {
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
      p.created_at,
      (SELECT COUNT(product_id) FROM comments WHERE comments.product_id = p.id) AS reviewCount,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 1) AS isFree,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 2) AS isDashin,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 3) AS isCool,
      (SELECT COUNT(*) FROM products_shipments s WHERE s.product_id=p.id AND s.shipment_id = 4) AS isBasic
    FROM products p
    JOIN products_thumbnails i
    ON i.product_id = p.id
    WHERE p.sub_category_id=1
    `;

  return products;
};
export default {
  getCategory,
  getNewestProductOfEachCategory,
  getProductsForMainCategory,
  getProductsForSubCategory,
};
