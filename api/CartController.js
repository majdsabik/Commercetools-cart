/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */
const { listCarts, showCart, findCart, createCart, updateCart, addProduct, removeProduct, deleteCart } = require('./CartRepository');

class CartController {
  async list(_req, res) {
    try {
      const result = await listCarts();
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const result = await showCart(id);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  async find(req, res) {
    try {
      const { query } = req;
      const result = await findCart(query);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  async create(req, res) {
    try {
      const cart = { currency: 'EUR', taxMode: 'Disabled', anonymousId: req.body.anonId };
      const result = await createCart(cart);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const cart = req.body;
      const result = await updateCart(id, cart);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  async addToCart(req, res) {
    try {
      const { id } = req.params;
      const product = req.body;
      const result = await addProduct(id, product);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  async removeFromCart(req, res) {
    try {
      const { id } = req.params;
      const { customLineItemId } = req.body;
      const result = await removeProduct(id, customLineItemId);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const { version } = req.query;
      const result = await deleteCart(id, version);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = CartController;
