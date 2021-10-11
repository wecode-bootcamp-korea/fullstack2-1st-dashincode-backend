import prisma from '../prisma';

const addComment = async (addedComment, userId) => {
  await prisma.$queryRaw`
    INSERT INTO
      comments (user_id, comment,)
    VALUES (${addedComment.userId}, ${addedComment.comment})
    WHERE user_id = ${userId}
  `
};

const getCommentList = async () => {
  const commentList = await prisma.$queryRaw`
    SELECT
      c.user_id,
      c.product_id,
      c.scores,
      c.comment,
      c.image_url,
      c.created_at
    FROM
      users u
    JOIN
      comments c
    ON
      u.id = c.user_id
    JOIN
      products p
    ON
      c.product_id = p.id
    WHERE user_id = ${userId}
  `
 return commentList;
};

export default { addComment, getCommentList };
