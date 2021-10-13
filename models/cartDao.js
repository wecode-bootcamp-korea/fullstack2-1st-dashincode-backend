import prisma from '../prisma';

const addCartList = async (addedProduct, userId) => {
  const { productId, productQuantity } = addedProduct;
  await prisma.$queryRaw`
    INSERT INTO
      carts (product_id, quantity, user_id)
    VALUES
      (${productId}, ${productQuantity}, ${userId})
    `;
  const a = await prisma.$queryRaw`
  SELECT * FROM carts
  `
}

const checkCartList = async (addedProduct, userId) => {
  const { productId } = addedProduct;
  const [existingProduct] = await prisma.$queryRaw`
    SELECT COUNT(*) AS count
    FROM
      carts c
    WHERE
      c.user_id = ${userId}
    AND
      c.product_id = ${productId}
    `;
    console.log(typeof existingProduct.count);
  return existingProduct.count;
}

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

const getCartList = async (userId) => {
  const products = await prisma.$queryRaw`
  SELECT
    c.product_id,
    p.name,
    pt.image_url,
    p.discounted_price,
    p.price,
    c.quantity,
    p.storage,
    p.description
    FROM
    carts c
    JOIN
      products p
    ON
      c.product_id = p.id
    JOIN
      products_thumbnails pt
    ON
      p.id = pt.product_id
    WHERE
      c.user_id = ${userId}
    `;
  return products;
};

const updateCartList = async (updatedProduct, userId) => {
  const { productId, productQuantity } = updatedProduct;
  return await prisma.$queryRaw`
    UPDATE
      carts c
    SET
      quantity = ${productQuantity}
    WHERE
      c.product_id = ${productId}
    AND
      c.user_id = ${userId}
    `;
}

const deleteCartList =  async (cartId, productId) => {
  const cartList = await prisma.$queryRaw`
    DELETE FROM
      carts c
    WHERE
      c.id = ${cartId}
  `;
  return cartList;
}

const getProductAmountInCart = async (userId) => {
  const [productAmountInCart] = await prisma.$queryRaw`
    SELECT COUNT(*) AS count
    FROM
      carts c
    WHERE
      c.user_id = ${userId}
    `;
  return productAmountInCart.count;
}

export default { addCartList, checkCartList, getShipmentsOfProduct, getCartList, updateCartList, deleteCartList, getProductAmountInCart };
