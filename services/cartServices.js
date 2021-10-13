import { cartDao } from '../models';

const addCartList = async (addedProduct, userId) => {
  const isExistingProduct = cartDao.checkCartList(addedProduct, userId);
  if(isExistingProduct) {
    await cartDao.updateCartList(addedProduct, userId)
  } else {
    await cartDao.addCartList(addedProduct, userId)
  }
}

const getCartList= async (userId) => {
  const products = await cartDao.getCartList(userId);
  if (!products.length) {
    const err = new Error("PRODUCTS_NOT_FOUND");
    err.statusCode = 404;
    throw err;
  }
  return products;
};

const updateCartList = async (updatedProduct, userId) => {
  return await cartDao.updateCartList(updatedProduct, userId);
}

const deleteCartList = async (cartId, productId) => {
  return await cartDao.deletecartList(cartId, productId);
}

const getProductAmountInCart = async (userId) => {
  return await cartDao.getProductAmountInCart(userId);
}

export default { addCartList, getCartList, updateCartList, deleteCartList, getProductAmountInCart };

