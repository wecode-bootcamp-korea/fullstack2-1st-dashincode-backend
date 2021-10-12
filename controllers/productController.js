import { productServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const getProductDetail = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productDetail = await productServices.isProductDetail(id);

  // const productImages = await productServices.getProductImages(id);
  // description image로 해야되나???

  res.json(productDetail);
});


export default { isProductDetail };
