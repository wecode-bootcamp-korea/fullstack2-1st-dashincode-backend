import { productDao } from '../models';
import { errorStatus } from '../utils'

const isProductDetail = async productId => {
  const product = productDao.getProduct(productId);

  if(!product) errorStatus(404, 'NO_EXIST_PRODUCT');

  const descriptionImage = await productDao.isProductImage(productId);

  if(!descriptionImage) errorStatus(404, 'No_EXIST_PRODUCT_IMAGE');


  return isProductDetail;
};

// 옵션 x ,컨트롤러 변수명

export default { isProductDetail };
