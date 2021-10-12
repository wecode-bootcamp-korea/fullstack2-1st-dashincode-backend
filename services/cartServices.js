import { cartDao } from '../models';

const addCartList = async (addedProduct, userId) => {
  return await cartDao.addCartList(addedProduct, userId);
}

const getCartList= async (userId) => {
  const products = await cartDao.getCartList(userId);
  return products;
};

const updateCartList = async (updatedCartList, userId) => {
  return await cartDao.updateartList(updatedCartList, userId);
}

const deleteCartList = async (product_id, userId) => {
  return await cartDao.deletecartList(product_id, userId);
}

export default { addCartList, getCartList, updateCartList, deleteCartList };

