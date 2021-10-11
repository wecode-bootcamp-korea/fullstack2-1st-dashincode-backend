import { productDao } from '../models';

const getProducts = async () => {
  return await productDao.getProducts();
};

const getProduct = async productId => {
  return await productDao.getProduct(productId);
}

export default { getProducts, getProduct };
