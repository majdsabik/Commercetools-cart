const axios = require('axios');

const axiosApi = axios.create({
  baseURL: 'https://api.europe-west1.gcp.commercetools.com/',
  headers: {
    Authorization: process.env.CTToken,
  },
});

module.exports = axiosApi;
