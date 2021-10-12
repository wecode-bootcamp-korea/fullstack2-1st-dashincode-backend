import { listServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const getProductsForEachCategory = wrapAsync(async (req, res) => {
  const { depth, id } = req.params;
  const products = await listServices.getProductsForEachCategory(depth, id);
  res.status(200).json({
    DATA: products,
  });
});

const getCategorizedProducts = wrapAsync(async (req, res) => {
  const { sort } = req.params;
  const products = await listServices.getCategorizedProducts(sort);
  res.status(200).json({
    DATA: products,
  });
});
export default { getProductsForEachCategory, getCategorizedProducts };