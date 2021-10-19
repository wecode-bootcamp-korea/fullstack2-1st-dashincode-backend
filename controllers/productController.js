import { productServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const getCategory = wrapAsync(async (req, res) => {
  const { location } = req.query;
  const category = await productServices.getCategory(location);
  res.status(200).json({
    DATA: category,
  });
});

const getSpecialProduct = wrapAsync(async (req, res) => {
  const product = await productServices.getSpecialProduct();
  res.status(200).json({
    DATA: product,
  });
});

const getProductNavBar = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productNavBar = await productServices.getProductNavBar(id);
  res.json(productNavBar);
});

const getProductDetail = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productDetail = await productServices.getProductDetail(id);
  res.json(productDetail);
});

const getProductThumbNail = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productThumbnail = await productServices.getProductThumbNail(id);
  res.json(productThumbnail);
});

const getProductDescriptionImage = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productImage = await productServices.getProductDescriptionImage(id);
  res.json(productImage);
});

// comment API Test
const getProductCommentList = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const commentList = await productServices.getProductCommentList(id);
  res.json(commentList);
});

//like API
const getLikedProduct = wrapAsync(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const isLiked = await productServices.getLikedProduct(productId, userId);
  res.status(200).json({
    data: isLiked === 1 ? true : false,
  });
});

const likeProduct = wrapAsync(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const isLiked = await productServices.likeProduct(productId, userId);
  res.status(200).json({
    data: isLiked,
  });
});

const unlikeProduct = wrapAsync(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const isLiked = await productServices.unlikeProduct(productId, userId);
  res.status(200).json({
    data: isLiked,
  });
});

export default {
  getCategory,
  getSpecialProduct,
  getProductNavBar,
  getProductDetail,
  getProductThumbNail,
  getProductDescriptionImage,
  getProductCommentList,
  getLikedProduct,
  likeProduct,
  unlikeProduct,
};
