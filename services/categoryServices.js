import { categoryDao } from '../models';

const getCategory = async location => {
  const categories = await categoryDao.getCategory();
  const category = categories[0];
  const subCategory = categories[1];

  const groupBy = function (data, key) {
    return data.reduce(function (carry, el) {
      let group = el[key];

      if (carry[group] === undefined) {
        carry[group] = [];
      }

      carry[group].push(el);
      return carry;
    }, {});
  };

  const groupedSubCategory = groupBy(subCategory, 'main_category_id');
  category.map((value, index) => {
    const mainCategoryId = (index + 1).toString();
    value.list = groupedSubCategory[mainCategoryId];
  });

  if (location === 'slider') {
    const newestProductOfEachCategory =
      await categoryDao.getNewestProductOfEachCategory();
    const groupedNewestProductOfEachCategory = groupBy(
      newestProductOfEachCategory,
      'main_category_id'
    );
    category.map((value, index) => {
      const mainCategoryId = (index + 1).toString();
      value.product = groupedNewestProductOfEachCategory[mainCategoryId];
    });
  }

  return category;
};

const getProductsForEachCategory = async (depth, id) => {
  if (depth === 'main') {
    return await categoryDao.getProductsForMainCategory(id);
  } else if (depth === 'sub') {
    return await categoryDao.getProductsForSubCategory(id);
  }
};

const getCategorizedProducts = async sort => {
  if (sort === 'best') {
    return await categoryDao.getBestProducts();
  } else if (sort === 'new') {
    return await categoryDao.getNewProducts();
  } else if (sort === 'dashindelivery') {
    return await categoryDao.getDashinDeliveryProducts();
  } else if (sort === 'cooldelivery') {
    return await categoryDao.getCoolDeliveryProducts();
  } else if (sort === 'mainpage') {
    return await categoryDao.getMainPageProducts();
  }
};

export default {
  getCategory,
  getProductsForEachCategory,
  getCategorizedProducts,
};
