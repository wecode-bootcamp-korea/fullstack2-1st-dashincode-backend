import prisma from '../prisma';

const getLikedProduct = async (productId, userId) => {
  const [isLiked] = await prisma.$queryRaw`
    SELECT EXISTS
      (SELECT * FROM likes 
        WHERE 
          product_id=${productId}
        AND
          user_id=${userId}
      )
  `;
  return isLiked;
};

const addLike = async (productId, userId) => {
  return await prisma.$queryRaw`
    INSERT INTO 
      likes 
      (product_id, user_id) 
    VALUE 
      (${productId}, ${userId})
  `;
};

const deleteLike = async (productId, userId) => {
  return await prisma.$queryRaw`
    DELETE FROM
      likes 
    WHERE 
      product_id=${productId} 
    AND 
      user_id=${userId}
  `;
};

export default { getLikedProduct, addLike, deleteLike };
