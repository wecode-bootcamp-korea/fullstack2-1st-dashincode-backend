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

const getProductNav = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productNav = await productServices.getProductNav(id);
  res.json(productNav);
});

const getProductInfo = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productInfo = await productServices.getProductInfo(id);
  res.json(productInfo);
});

const getProductThumbnails = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productThumbnails = await productServices.getProductThumbnails(id);
  res.json(productThumbnails);
});

const getProductDescriptionImage = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productImage = await productServices.getProductDescriptionImage(id);
  res.json(productImage);
});

const getProductReviewList = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const reviewList = await productServices.getProductReviewList(id);
  res.json(reviewList);
});

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
  getProductNav,
  getProductInfo,
  getProductThumbnails,
  getProductDescriptionImage,
  getProductReviewList,
  getLikedProduct,
  likeProduct,
  unlikeProduct,
};
