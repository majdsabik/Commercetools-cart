/* eslint-env node, mocha */
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
require('../app');
const nock = require('nock');
// eslint-disable-next-line object-curly-newline
const { listCarts, showCart, createCart, updateCart, deleteCart } = require('../api/CartRepository');
const listResponse = require('./listResponse.json');
const showResponse = require('./showResponse.json');
const createResponse = require('./createResponse.json');
const updateResponse = require('./updateResponse.json');
const deleteResponse = require('./deleteResponse.json');

describe('Cart CRUD operations:', () => {
  before(() => {
    nock.disableNetConnect();
  });

  after(() => {
    nock.enableNetConnect();
  });

  it('List all carts.', async () => {
    nock('https://api.europe-west1.gcp.commercetools.com/').get('/msitutorial/carts/').reply(200, listResponse);
    const list = await listCarts();
    expect(list.data).to.have.property('results').that.is.an('array');
    expect(list.data).to.deep.equal(listResponse);
    expect(list.status).to.equal(200);
  });

  it('Show a specific cart.', async () => {
    const id = '1f8ef24b-9aa7-4606-990d-07349364f47b';
    nock('https://api.europe-west1.gcp.commercetools.com/').get(`/msitutorial/carts/${id}`).reply(200, showResponse);
    const cart = await showCart(id);
    expect(cart.data).to.have.property('customLineItems').that.is.a('array');
    expect(cart.data).to.deep.equal(showResponse);
    expect(cart.status).to.equal(200);
  });

  it('Create a new cart.', async () => {
    const cart = {
      currency: 'EUR',
      taxMode: 'Disabled',
    };
    nock('https://api.europe-west1.gcp.commercetools.com/').post('/msitutorial/carts/').reply(201, createResponse);
    const response = await createCart(cart);
    expect(response.data).to.have.property('taxMode').that.is.a('string').equal('Disabled');
    expect(response.data).to.deep.equal(createResponse);
    expect(response.status).to.equal(201);
  });

  it('Update a specific cart.', async () => {
    const id = '1f8ef24b-9aa7-4606-990d-07349364f47b';
    const request = {
      version: 6,
      actions: [
        {
          action: 'addCustomLineItem',
          name: {
            de: 'Name des Artikels',
            en: 'Item name',
          },
          quantity: 1,
          money: {
            currencyCode: 'EUR',
            centAmount: 2900,
          },
          slug: 'kjsdfkj',
        },
      ],
    };
    nock('https://api.europe-west1.gcp.commercetools.com/').post(`/msitutorial/carts/${id}`).reply(200, updateResponse);
    const response = await updateCart(id, request);
    expect(response.data).to.have.property('customLineItems').have.length.above(0);
    expect(response.data).to.deep.equal(updateResponse);
    expect(response.status).to.equal(200);
  });

  it('Delete a specific cart.', async () => {
    const id = '1f8ef24b-9aa7-4606-990d-07349364f47b';
    const version = 1;
    nock('https://api.europe-west1.gcp.commercetools.com/').delete(`/msitutorial/carts/${id}`).query({ version: 1 }).reply(200, deleteResponse);
    const response = await deleteCart(id, version);
    expect(response.data).to.have.property('taxMode').that.is.a('string').equal('Disabled');
    expect(response.data).to.deep.equal(deleteResponse);
    expect(response.status).to.equal(200);
  });
});
