const { options } = require('../../constants/swagger');

options.tags = ['Code'];

module.exports = {
  '/code/cohorts': {
    get: {
      ...options,
      description: 'Get cohorts',
      responses: {
        200: { description: 'ok' },
      },
    },
  },
  '/code/app': {
    get: {
      ...options,
      description: 'Get codes',
      responses: {
        200: { description: 'ok' },
      },
    },
  },
  '/code': {
    get: {
      ...options,
      description: 'Get codes',
      responses: {
        200: { description: 'ok' },
      },
    },
  },
  '/code/registration': {
    post: {
      ...options,
      description: 'New registration code',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'code',
        required: true,
        type: 'string',
        example: 'code',
      }, {
        in: 'body',
        name: 'owner',
        required: true,
        type: 'string',
        example: 'string',
      }, {
        in: 'body',
        name: 'title',
        required: true,
        type: 'string',
        example: 'title',
      }, {
        in: 'body',
        name: 'initial_count',
        required: true,
        type: 'integer',
        example: 1,
      }],
    },
  },
};
