import prisma from '../prisma';

const addCartList = async (addedProduct, userId) => {
  const { productId, productQuantity } = addedProduct;
  return await prisma.$queryRaw`
    INSERT INTO
      carts
    VALUES
      (product_id, quantity, user_id)
    ON DUPLICATE KEY UPDATE
      product_id = ${productId} quantity=${productQuantity}
    JOIN
      users u
    ON
      c.user_id = u.id
    WHERE
      c.user_id = ${userId}
    `;
}

const getCartList = async (userId) => {
  const products = await prisma.$queryRaw`
    SELECT
    s.id,
    s.shipment,
    c.product_id,
    p.name,
    d.image_url,
    p.discounted_price,
    p.price,
    c.quantity,
    p.storage,
    p.description
    FROM
      users u
    JOIN
      carts c
    ON
      u.id = c.user_id
    JOIN
      products p
    ON
      c.product_id = p.id
    JOIN
      products_shipments ps
    ON
      p.id = ps.product_id
    JOIN
      shipments s
    ON
      ps.shipment_id = s.id
    JOIN
      description_images d
    ON
      p.id = d.product_id
    WHERE c.user_id = ${userId}
    `;
  return products;
};

const updateCartList = async (updatedProduct, userId) => {
  const { product_id, productQuantity } = updatedProduct;
  return await prisma.$queryRaw`
    UPDATE
      carts
    SET
      quantity = ${productQuantity}
    JOIN
      users u
    ON
      c.user_id = u.id
    WHERE
      u.id = ${userId}
    AND
      p.id = ${product_id}
    `;
}

const deleteCartList =  async (product_id, userId) => {
  const cartList = await prisma.$queryRaw`
    UPDATE
      carts
    SET
      c.deleted_at = now(),
      c.is_deleted = true
    JOIN
      users u
    ON
      c.user_id = u.id
    WHERE
      c.product_id = ${product_id}
    AND
      u.id = ${userId}
  `;
  return cartList;
}

const getProductAmount = async () => {
  const productAmount = await prisma.$queryRaw`
    SELECT COUNT
      c.product_id
    FROM
      carts c
    WHERE
      c.user_id = ${userId}
    `;
  return productAmount;
}

export default { addCartList, getCartList, updateCartList, deleteCartList, getProductAmount };
