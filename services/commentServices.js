import { commentDao } from '../models';

const addComment = async() => {
  return await commentDao.addComment();
}

const getCommentList = async() => {
  return await commentDao.getCommentList();

}
export default { addComment, getCommentList };
