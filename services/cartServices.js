import { cartDao } from '../models';

const addCartList = async (addedProduct, userId) => {
  const isExistingProduct = await cartDao.checkCartList(addedProduct, userId);
  if(isExistingProduct === 1) {
    return await cartDao.updateCartList(addedProduct, userId)
  } else if (isExistingProduct === 0){
    return await cartDao.addCartList(addedProduct, userId)
  }
}

const getCartList= async (userId) => {
  const products = await cartDao.getCartList(userId);
  for (const product of products) {
    const shipments = await cartDao.getShipmentsOfProduct(product.product_id);
    for (let i = 0; i < shipments.length; i++) {
      shipments[i] = shipments[i].shipment;
    }
    product.shipment = shipments;
  }
  return products;
};

const updateCartList = async (updatedProduct, userId) => {
  return await cartDao.updateCartList(updatedProduct, userId);
}

const deleteCartList = async (cartId, productId) => {
  return await cartDao.deleteCartList(cartId, productId);
}

const getProductAmountInCart = async (userId) => {
  return await cartDao.getProductAmountInCart(userId);
}

export default { addCartList, getCartList, updateCartList, deleteCartList, getProductAmountInCart };

