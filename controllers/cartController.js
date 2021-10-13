import { cartServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';


const addCartList = wrapAsync(async (req, res) => {
  const {productId, productQuantity} = req.body;
  const addedProduct = {productId, productQuantity}
  const userId = req.user.id;
  if (!productId || !productQuantity) {
    const err = new Error('NO_ADDED_PRODUCT');
    err.status = 400;
    throw err;
  }
  await cartServices.addCartList(addedProduct, userId);
  res.status(201).json({
    message: '장바구니에 추가되었습니다.',
  });
});

const getCartList = wrapAsync(async (req, res) => {
  const userId = req.user.id;
  const products = await cartServices.getCartList(userId);
  res.status(200).json({
    products
  });
});

const updateCartList = wrapAsync(async (req, res) => {
  const {productId, productQuantity} = req.body;
  const updatedProduct = {productId, productQuantity}
  const userId = req.user.id;
  if (!productId || !productQuantity) {
    const err = new Error('NO_UPDATED_PRODUCT');
    err.status = 400;
    throw err;
  }
  await cartServices.updateCartList(updatedProduct, userId);
  res.status(201).json({
    message: '장바구니가 수정되었습니다.'
  })
});

const deleteCartList = wrapAsync(async (req, res) => {
  const cartId = req.params.id;
  const productId = req.body;
  if (!productId) {
    const err = new Error('NO_DELETED_PRODUCT');
    err.status = 400;
    throw err;
  }
  await cartServices.deleteCartList(cartId, productId);
  res.status(201).json({
    message: '장바구니에서 삭제되었습니다.'
  });
});

const getProductAmountInCart = wrapAsync(async (req, res) => {
  const userId = req.user.id;
  await cartServices.getProductAmountInCart(userId);
  res.status(201).json({
    productAmountInCart
  });
})

export default { addCartList, getCartList, updateCartList, deleteCartList, getProductAmountInCart };
