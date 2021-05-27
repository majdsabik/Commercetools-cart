const express = require('express');
const CartController = require('./CartController');

const Controller = new CartController();
const routes = express.Router();

routes.get('/carts', Controller.list);
routes.get('/carts/find', Controller.find);
routes.get('/carts/:id', Controller.show);
routes.post('/carts', Controller.create);
routes.post('/carts/:id', Controller.update);
routes.post('/add/:id', Controller.addToCart);
routes.post('/remove/:id', Controller.removeFromCart);
routes.delete('/carts/:id', Controller.delete);

module.exports = routes;
