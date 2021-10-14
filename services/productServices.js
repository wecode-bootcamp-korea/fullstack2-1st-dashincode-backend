import { productDao } from '../models';
import { errorStatus } from '../utils';

const getCategory = async location => {
  const mainCategory = await productDao.getMainCategory();
  for (const category of mainCategory) {
    const subCategory = await productDao.getSubCategory(category.id);
    category.list = subCategory;
  }
  if (location === 'slider') {
    for (const category of mainCategory) {
      const newestProductsOfMainCategory =
        await productDao.getNewestProductOfEachCategory(category.id);
      category.product = newestProductsOfMainCategory;
    }
  }
  return mainCategory;
};

const getSpecialProduct = async () => {
  const products = await productDao.getSpecialProduct();
  const shipments = await productDao.getShipmentsOfProduct(products.id);
  for (let i = 0; i < shipments.length; i++) {
    shipments[i] = shipments[i].shipment;
  }
  products.shipment = shipments;
  return products;
};

const getProductNavBar = async productId => {
  const productNavBar = await productDao.getProductNavBar(productId);
  return productNavBar;
};

const getProductDetail = async productId => {
  const product = await productDao.getProductDetail(productId);
  const productShipment = await productDao.getProductShipment(productId);
  for (let i = 0; i < productShipment.length; i++) {
    productShipment[i] = productShipment[i].shipment;
  }
  product.shipment = productShipment;
  if (!product) errorStatus(404, 'NO_EXIST_PRODUCT');
  return product;
};

const getProductThumbNail = async productId => {
  const productThumbNail = await productDao.getProductThumbNail(productId);
  return productThumbNail;
};

const getProductDescriptionImage = async productId => {
  const descriptionImage = await productDao.getProductDescriptionImage(
    productId
  );
  if (!descriptionImage) errorStatus(404, 'NO_EXIST_PRODUCT_IMAGE');
  return descriptionImage;
};

// comment API Test
const getProductCommentList = async productId => {
  const commentList = await productDao.getProductCommentList(productId);
  return commentList;
};

export default {
  getCategory,
  getSpecialProduct,
  getProductNavBar,
  getProductDetail,
  getProductThumbNail,
  getProductDescriptionImage,
  getProductCommentList,
};
