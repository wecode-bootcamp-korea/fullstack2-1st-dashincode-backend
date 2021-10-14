import { wrapAsync } from '../utils/wrapAsync';
import { productServices } from '../services';

const getProductDetail = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productDetail = await productServices.getProductDetail(id);

  res.json(productDetail);
});

const getProductThumbNail = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const ProductThumbnail = await productServices.getProductThumbNail(id);

  res.json(ProductThumbnail);
});

const getProductDescriptionImage = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productImage = await productServices.getProductDescriptionImage(id);

  res.json(productImage);
});

const getProductNavBar = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productNavBar = await productServices.getProductNavBar(id);
  console.log(productNavBar);
  res.json(productNavBar);
});

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

export default {
  getProductDetail,
  getSpecialProduct,
  getProductThumbNail,
  getProductDescriptionImage,
  getProductNavBar,
  getCategory,
};
