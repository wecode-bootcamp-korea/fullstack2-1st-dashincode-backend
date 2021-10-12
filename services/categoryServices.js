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

export default {
  getCategory,
};
