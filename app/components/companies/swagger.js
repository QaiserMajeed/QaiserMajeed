const { options } = require('../../constants/swagger');

options.tags = ['Company'];

module.exports = {
  '/companies': {
    get: {
      ...options,
      description: 'Get companies',
      responses: {
        200: { description: 'ok' },
      },
    },
    post: {
      ...options,
      description: 'Create company',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'company_name',
        required: true,
        type: 'string',
        example: 'company name',
      }, {
        in: 'body',
        name: 'owner',
        required: true,
        type: 'string',
        example: 'string',
      }],
    },
  },
};
