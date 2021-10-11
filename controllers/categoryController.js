import { categoryServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const getCategory = wrapAsync(async (req, res) => {
  const location = req.params.location;
  const category = await categoryServices.getCategory(location);
  res.status(200).json({
    DATA: category,
  });
});

const getProductsForEachCategory = wrapAsync(async (req, res) => {
  const { depth, id } = req.params;
  const products = await categoryServices.getProductsForEachCategory(depth, id);
  res.status(200).json({
    DATA: products,
  });
});

const getCategorizedProducts = wrapAsync(async (req, res) => {
  const { sort } = req.params;
  const products = await categoryServices.getCategorizedProducts(sort);
  res.status(200).json({
    DATA: products,
  });
});

export default {
  getCategory,
  getProductsForEachCategory,
  getCategorizedProducts,
};
