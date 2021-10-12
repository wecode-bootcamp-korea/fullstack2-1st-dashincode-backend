import { listDao } from '../models';

const getProductsForEachCategory = async (depth, id) => {
  if (depth === 'main') {
    return await listDao.getProductsForMainCategory(id);
  } else if (depth === 'sub') {
    return await listDao.getProductsForSubCategory(id);
  }
};

const getCategorizedProducts = async sort => {
  if (sort === 'best') {
    return await listDao.getBestProducts();
  } else if (sort === 'new') {
    return await listDao.getNewProducts();
  } else if (sort === 'dashindelivery') {
    return await listDao.getDashinDeliveryProducts();
  } else if (sort === 'cooldelivery') {
    return await listDao.getCoolDeliveryProducts();
  } else if (sort === 'mainpage') {
    return await listDao.getMainPageProducts();
  }
};

export default { getProductsForEachCategory, getCategorizedProducts };
