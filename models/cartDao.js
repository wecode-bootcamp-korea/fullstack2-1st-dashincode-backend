import prisma from '../prisma';

const addCartList = async (addedProduct, userId) => {
  const { productId, productQuantity } = addedProduct;
  return await prisma.$queryRaw`
    INSERT INTO
      carts (product_id, quantity)
    VALUES
      (${productId}, ${productQuantity})
    JOIN
      users u
    ON
      c.user_id = u.id
    WHERE
      c.user_id = ${userId}
    `;
}

const checkCartList = async (addedProduct, userId) => {
  const { productId } = addedProduct;
  const [existingProduct] = await prisma.$queryRaw`
    SELECT
      c.user_id,
      c.product_id
    FROM
      carts c
    WHERE
      c.user_id = ${userId}
    AND
      c.product_id = ${productId}
    `
  return existingProduct;
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
    WHERE
      c.user_id = ${userId}
    `;
  return products;
};

const updateCartList = async (updatedProduct, userId) => {
  const { productId, productQuantity } = updatedProduct;
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
      p.id = ${productId}
    `;
}

const deleteCartList =  async (cartId, productId) => {
  const cartList = await prisma.$queryRaw`
    DELETE FROM
      carts c
    WHERE
      c.id = ${cartId}
    AND
      c.product_id = ${productId}
  `;
  return cartList;
}

const getProductAmountInCart = async (userId) => {
  const productAmountInCart = await prisma.$queryRaw`
    SELECT COUNT
      c.product_id
    FROM
      carts c
    WHERE
      c.user_id = ${userId}
    `;
  return productAmountInCart;
}

export default { addCartList, checkCartList, getCartList, updateCartList, deleteCartList, getProductAmountInCart };
