const { options } = require('../../constants/swagger');
const { responses } = require('../../utils/responses/swagger');

options.tags = ['Admin'];

const adminResponses = {
  admins: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '606ac05a1a72f0539843b38a',
        },
        first_name: {
          type: 'string',
        },
        last_name: {
          type: 'string',
        },
        phone: {
          type: 'string',
        },
        company: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
      },
    },
  },
};

const paginationResponse = responses({
  ...adminResponses,
  pages: {
    type: 'integer',
  },
  counts: {
    type: 'integer',
  },
});

module.exports = {
  '/superadmin': {
    get: {
      ...options,
      description: 'Get all admin',
      responses: responses({
        admins: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '606ac05a1a72f0539843b38a',
              },
              user_type: {
                type: 'integer',
                example: 1,
              },
              status: {
                type: 'string',
                example: 'not_payed',
              },
            },
          },
        },
      }),
    },
  },
  '/superadmin/:page': {
    get: {
      ...options,
      description: 'Get all admin with pagination',
      responses: paginationResponse,
      parameters: [{
        in: 'path',
        name: 'page',
        required: true,
        type: 'string',
        example: '1',
      }],
    },
  },
  '/superadmin/sort/:type/:orderby/:page': {
    get: {
      ...options,
      description: 'Sorting admin',
      responses: responses(adminResponses),
      parameters: [{
        in: 'path',
        name: 'type',
        required: true,
        type: 'email',
        example: '1',
      }, {
        in: 'path',
        name: 'orderby',
        required: true,
        type: 'desc',
        example: '1',
      }, {
        in: 'path',
        name: 'page',
        required: true,
        type: 'string',
        example: '1',
      }],
    },
  },
  '/superadmin/:id/': {
    delete: {
      ...options,
      description: 'Delete admin',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'path',
        name: 'id',
        required: true,
        type: 'string',
        example: '1',
      }],
    },
  },
  '/superadmin/search/:query': {
    get: {
      ...options,
      description: 'Search all admin',
      responses: paginationResponse,
      parameters: [{
        in: 'path',
        name: 'query',
        required: true,
        type: 'string',
        example: '1',
      }],
    },
  },
};
