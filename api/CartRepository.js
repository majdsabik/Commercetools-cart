const axiosAPI = require('./axiosAPI');

const listCarts = async () => {
  const carts = await axiosAPI.get('/msitutorial/carts/');
  return carts;
};

const showCart = async (id) => {
  const cart = await axiosAPI.get(`/msitutorial/carts/${id}`);
  return cart;
};

const findCart = async (query) => {
  const cart = await axiosAPI.get(`/msitutorial/carts?where=anonymousId%3D"${query.anonId}"`);
  return cart;
};

const createCart = async (cart) => {
  const result = await axiosAPI.post('/msitutorial/carts/', cart);
  return result;
};

const updateCart = async (id, cart) => {
  const result = await axiosAPI.post(`/msitutorial/carts/${id}`, cart);
  return result;
};

const addProduct = async (id, product) => {
  const cart = (await showCart(id)).data;
  const { version } = cart;
  const actionsBody = JSON.parse(JSON.stringify(product));
  actionsBody.action = 'addCustomLineItem';
  const updatedCart = { version, actions: [actionsBody] };
  const result = await updateCart(id, updatedCart);
  return result;
};

const removeProduct = async (id, customLineItemId) => {
  const cart = (await showCart(id)).data;
  const { version } = cart;
  const updatedCart = { version, actions: [{ action: 'removeCustomLineItem', customLineItemId }] };
  const result = await updateCart(id, updatedCart);
  return result;
};

const deleteCart = async (id, version) => {
  const result = await axiosAPI.delete(`/msitutorial/carts/${id}`, { params: { version } });
  return result;
};

module.exports = {
  listCarts,
  showCart,
  findCart,
  createCart,
  updateCart,
  addProduct,
  removeProduct,
  deleteCart,
};
