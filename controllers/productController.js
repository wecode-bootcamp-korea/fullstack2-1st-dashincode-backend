import { wrapAsync } from '../utils/wrapAsync';
import { productServices } from '../services';

const getProductDetail = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productDetail = await productServices.getProductDetail(id);

  res.json(productDetail);
});

const getProductShipment = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productShipment = await productServices.getProductShipment(id);

  res.json(productShipment)
});

const getProductImage = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const productImage = await productServices.getProductImage(id);

  res.json(productImage)
})


const getCategory = wrapAsync(async (req, res) => {
  const { location } = req.query;
  const category = await productServices.getCategory(location);
  res.status(200).json({
    DATA: category,
  });
});

export default { getProductDetail , getProductShipment, getProductImage, getCategory };
