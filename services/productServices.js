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

const getProductNav = async productId => {
  const productNav = await productDao.getProductNav(productId);
  return productNav;
};

const getProductInfo = async productId => {
  const productInfo = await productDao.getProductInfo(productId);
  const productShipment = await productDao.getProductShipment(productId);
  for (let i = 0; i < productShipment.length; i++) {
    productShipment[i] = productShipment[i].shipment;
  }
  productInfo.shipment = productShipment;
  if (!productInfo) errorStatus(404, 'NO_EXIST_PRODUCT');
  return productInfo;
};

const getProductThumbnails = async productId => {
  const productThumbnails = await productDao.getProductThumbnails(productId);
  return productThumbnails;
};

const getProductDescriptionImage = async productId => {
  const descriptionImage = await productDao.getProductDescriptionImage(
    productId
  );
  if (!descriptionImage) errorStatus(404, 'NO_EXIST_PRODUCT_IMAGE');
  return descriptionImage;
};

const getProductReviewList = async productId => {
  const reviewList = await productDao.getProductReviewList(productId);
  return reviewList;
};

export default {
  getCategory,
  getSpecialProduct,
  getProductNav,
  getProductInfo,
  getProductThumbnails,
  getProductDescriptionImage,
  getProductReviewList,
};
