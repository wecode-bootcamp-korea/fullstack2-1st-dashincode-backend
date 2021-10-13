import { productDao } from '../models';
import { errorStatus } from '../utils'

const getProductDetail = async productId => {
  const product = productDao.getProductDetail(productId);
  
  if(!product) errorStatus(404, 'NO_EXIST_PRODUCT');
  return getProductDetail;
};

const getProductImage = async productId => {
  const descriptionImage = productDao.getProductImage(productId);
  
  if(!descriptionImage) errorStatus(404, 'No_EXIST_PRODUCT_IMAGE');
  return productImage;
}

const getProductShipment = async productId => {
  const productShipment = productDao.getProductShipment(productId);

  if (!Shipment) errorStatus(404, 'No_EXIST_PRODUCT_SHIPMENT');
  return productShipment;
}

const getCategory = async location => {
  const mainCategory = await productDao.getMainCategory();
  // for (const category of mainCategory) {
  //   const subCategory = await productDao.getSubCategory(category.id);
  //   category.list = subCategory;
  // }

  // if (location === 'slider') {
  //   for (const category of mainCategory) {
  //     const newestProductsOfMainCategory =
  //       productDao.getNewestProductOfEachCategory(category.id);
  //       category.product = newestProductsOfMainCategory;
  //   }
  // }
  return mainCategory;
};

export default { getProductDetail, getProductImage, getProductShipment, getCategory };
