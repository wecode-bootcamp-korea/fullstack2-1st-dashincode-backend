import { cartServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';


const addCartList = wrapAsync(async (req, res) => {
  const addedProduct = req.body;
  const userId = req.middleware.userId;
  await cartServices.addCartList(addedProduct, userId);
  res.status(201).json({
    message: '장바구니에 추가되었습니다.',
  });
});

const getCartList = wrapAsync(async (req, res) => {
  // const userId = req.middleware.userId;
  const userId = req.params.id;
  const products = await cartServices.getCartList(userId);
  res.status(201).json({
    products: products
  });
});

const updateCartList = wrapAsync(async (req, res) => {
  const updatedProduct = req.body;
  const userId = req.middleware.userId;
  await cartServices.updateCartList(updatedCartList, userId);
  res.status(201).json({
    message: '장바구니가 수정되었습니다.'
  })
});

const deleteCartList = wrapAsync(async (req, res) => {
  const {product_id} = req.body;
  const userId = req.middleware.userId;
  await cartServices.deleteCartList(product_id, userId);
  res.status(201).json({
    message: '장바구니에서 삭제되었습니다.'
  });
});

export default { addCartList, getCartList, updateCartList, deleteCartList };
