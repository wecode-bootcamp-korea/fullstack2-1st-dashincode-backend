import { productServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync'

const getProducts = wrapAsync(async (req, res) => {
  const products = await productServices.getProducts();
  // res.status(200).json({
  //   message: 'SUCCESS',
  //   category,
  // });
  res.json(products);
});

const getProduct = wrapAsync(async (req, res) => {
  const id = req.params.id;

  const product = await productServices.getProduct(id);
  res.json(product);
});

export default { getProducts, getProduct };
