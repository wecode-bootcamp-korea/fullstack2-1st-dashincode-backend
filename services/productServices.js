import { productDao } from '../models';
import { errorStatus } from '../utils'

const getProductDetail = async productId => {
  const product = await productDao.getProductDetail(productId);
  
  if(!product) errorStatus(404, 'NO_EXIST_PRODUCT');
  return product;
};

const getProductDescriptionImage = async productId => {
  const descriptionImage = await productDao.getProductDescriptionImage(productId);
  
  if(!descriptionImage) errorStatus(404, 'NO_EXIST_PRODUCT_IMAGE');
  return descriptionImage;
}

const getProductThumbNail = async productId => {
  const productThumbNail = await productDao.getProductThumbNail(productId);

  if(!ThumbNail) errorStatus(404, 'NO_EXIST_PRODUCT_THUMBNAIL');
  return productThumbNail;
}

const getProductShipment = async productId => {
  const productShipment = await productDao.getProductShipment(productId);

  if (!Shipment) errorStatus(404, 'NO_EXIST_PRODUCT_SHIPMENT');
  return productShipment;
}

const getProductNavBar =async productId => {
  const productNavBar = await productDao.getProductNavBar(productId);

  if(!NavBar) errorStatus(404, 'NO_EXIST_PRODUCT_NAVBAR');
  return productNavBar;
}

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

export default { getProductDetail, getProductDescriptionImage, getProductThumbNail, getProductShipment, getProductNavBar, getCategory };
