import { listDao } from '../models';

const getShipments = async products => {
  for (const product of products) {
    const shipments = await listDao.getShipmentsOfProduct(product.id);
    for (let i = 0; i < shipments.length; i++) {
      shipments[i] = shipments[i].shipment;
    }
    product.shipment = shipments;
  }
};

const getProductsForEachCategory = async (depth, id) => {
  const products = await listDao.getProductsByCategoryId(depth, id);
  await getShipments(products);
  return products;
};

const getCategorizedProducts = async sort => {
  const products = await listDao.getProductsBySort(sort);
  await getShipments(products);
  return products;
};

const searchProducts = async value => {
  const products = await listDao.getSearchedProducts(value);
  await getShipments(products);
  return products;
};

export default {
  getProductsForEachCategory,
  getCategorizedProducts,
  searchProducts,
};
