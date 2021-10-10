import { cartDao } from '../models';

const addCartList = async (addedProduct, userId) => {
  return await cartDao.addCartList(addedProduct, userId);
}

const getCartList= async (userId) => {
  const cartList = await cartDao.getCartList(userId);
  return cartList;
};

const updateCartList = async (updatedCartList, userId) => {
  return await cartDao.updateartList(updatedCartList, userId);
}

const deleteCartList = async (product_id, userId) => {
  return await cartDao.deletecartList(product_id, userId);
}

export default { addCartList, getCartList, updateCartList, deleteCartList };

