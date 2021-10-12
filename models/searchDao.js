import prisma from '../prisma';

const searchProducts = async () => {
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
    ORDER BY p.id
  `;
};

export default { searchProducts };
