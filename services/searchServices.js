import { searchDao } from '../models';

const searchProducts = async value => {
  const allProducts = await searchDao.searchProducts();
  const filteredProducts = allProducts.filter(
    product =>
      product.name.includes(value) || product.description.includes(value)
  );
  return filteredProducts;
};

export default { searchProducts };
