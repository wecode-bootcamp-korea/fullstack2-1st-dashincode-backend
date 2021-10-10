import prisma from '../prisma';

const addCartList = async (addedProduct, userId) => {
  return await prisma.$queryRaw`
    INSERT INTO
      carts
    VALUES
      (product_id, quantity, user_id)
    ON DUPLICATE KEY UPDATE
      product_id = ${addedProduct.product_id} quantity=${addedProduct.quantity}
    JOIN
      users u
    ON
      c.user_id = u.id
    WHERE
      c.user_id = ${userId}
    `;
}

const getCartList = async (userId) => {
  const cartList = await prisma.$queryRaw`
    SELECT
      c.user_id,
      c.product_id,
      c.quantity,
      p.name,
      d.image_url,
      p.discounted_price,
      p.price,
      p.description,
      ps.shipment_id,
      s.shipment
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
  return cartList;
};

//장바구니 페이지에서 수량 변경시 업데이트
const updateCartList = async (updatedCartList, userId) => {
  return await prisma.$queryRaw`
    UPDATE
      carts
    SET
      quantity = ${updatedCartList.productQuantity}
    JOIN
      users u
    ON
      c.user_id = u.id
    WHERE
      u.id = ${userId}
    AND
      p.id = ${updatedCartList.product_id}
    `;
}

//장바구니 페이지에서 상품 선택하여 삭제시
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

export default { addCartList, getCartList, updateCartList, deleteCartList };
