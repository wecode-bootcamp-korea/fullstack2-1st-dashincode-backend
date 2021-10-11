import { commentServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const addComment = wrapAsync(async (req, res) => {
  const { comment } = req.body;
  const userId = req.middleware.id;
  const productId = req.params.id;
  const addedComment = { userId, productId, comment }
  await commentServices.addComment();
  res.status(201).json({
    message: '리뷰가 등록되었습니다.',
    addedComment
  });
});

const getCommentList = wrapAsync(async (req, res) => {
  const commentList = await commentServices.getCommentList();
  res.status(201).json({
    message: 'SUCCESS',
    commentList
  });
});

export default { addComment, getCommentList };

