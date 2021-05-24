module.exports = {
  extends: 'airbnb-base',
  env: { mocha: true },
  rules: {
    'valid-jsdoc': [
      'error',
      {
        preferType: {
          String: 'string',
          Number: 'number',
          Object: 'object',
          Promise: 'promise',
          Void: 'void',
          Undefined: 'undefined',
        },
      },
    ],
  },
};
