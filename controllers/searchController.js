import { searchServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const searchProducts = wrapAsync(async (req, res) => {
  // const value = decodeURIComponent(req.params.value);
  const { value } = req.params;
  const products = await searchServices.searchProducts(value);
  res.status(200).json({
    DATA: products,
  });
});

export default { searchProducts };
