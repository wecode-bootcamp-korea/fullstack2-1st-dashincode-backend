import { cartServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const addCartList = wrapAsync(async (req, res) => {
  const { productId, productQantity } = req.body;
  const userId = req.middleware.id;
  const addedProduct = {productId, productQantity}
  await cartServices.addCartList(addedProduct, userId);
  res.status(201).json({
    message: '장바구니에 추가되었습니다.',
  });
});

const getCartList = wrapAsync(async (req, res) => {
  const userId = req.middleware.id;
  // const userId = req.params.id;
  const cartList = await cartServices.getCartList(userId);
  res.status(201).json({
    cartList
  });
});

const updateCartList = wrapAsync(async (req, res) => {
  const { product_id, productQuantity } = req.body;
  const updatedCartList = {product_id, productQuantity}
  const userId = req.middleware.id;
  await cartServices.updateCartList(updatedCartList, userId);
  res.status(201).json({
    message: '장바구니가 수정되었습니다.'
  })
});

const deleteCartList = wrapAsync(async (req, res) => {
  const {product_id} = req.body;
  const userId = req.middleware.id;
  await cartServices.deleteCartList(product_id, userId);
  res.status(201).json({
    message: '장바구니에서 삭제되었습니다.'
  });
});

export default { addCartList, getCartList, updateCartList, deleteCartList };
