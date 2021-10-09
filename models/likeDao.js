import prisma from '../prisma';

const getLike = async (productId, userId) => {
  const [isLiked] = await prisma.$queryRaw`
    SELECT EXISTS
      (SELECT * FROM likes 
        WHERE 
          product_id=${productId}
        AND
          user_id=${userId})
    `;
  return isLiked;
};

const likeProduct = async (productId, userId) => {
  return await prisma.$queryRaw`
    INSERT INTO 
      likes 
      (product_id, user_id) 
    VALUE 
      (${productId}, ${userId})
  `;
};

const dislikeProduct = async (productId, userId) => {
  return await prisma.$queryRaw`
    DELETE FROM
      likes 
    WHERE 
      product_id=${productId} 
    AND 
      user_id=${userId}
  `;
};

export default { getLike, likeProduct, dislikeProduct };
