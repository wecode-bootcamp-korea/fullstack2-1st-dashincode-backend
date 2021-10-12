import { productServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const isProductDetail = wrapAsync(async (req, res) => {
  const { id } = req.query;
  const productDetail = await productServices.isProductDetail(id);

  // const productImages = await productServices.getProductImages(id);
  // description image로 해야되나???

  res.json(productDetail);
});


export default { isProductDetail };
