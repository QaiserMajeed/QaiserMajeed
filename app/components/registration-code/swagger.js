const { swaggerPagination } = require('../../constants/swagger');
const { responses } = require('../../utils/responses/swagger');
const { options, user, searchParams } = require('../../constants/swagger');

options.tags = ['Admin'];
const getCode = {
  _id: { type: 'string' },
  code: { type: 'string' },
  name: { type: 'string' },
  user,
  createdAt: { type: 'string' },
  availableCount: { type: 'number' },
  initialLicensesCount: { type: 'number' },
};

const code = [{
  in: 'body',
  name: 'code',
  required: true,
  type: 'string',
}, {
  in: 'body',
  name: 'name',
  required: true,
  type: 'string',
}, {
  in: 'body',
  name: 'availableCount',
  required: true,
  type: 'number',
}];

module.exports = {
  '/code/generate': {
    get: {
      ...options,
      tags: ['Registration code'],
      description: 'Generate code',
      responses: responses({
        code: {
          type: 'string',
        },
      }),
    },
  },
  '/code/check': {
    get: {
      ...options,
      tags: ['Registration code'],
      description: 'Check code for unique',
      responses: responses({
        unique: {
          type: 'boolean',
        },
      }),
      parameters: [{
        in: 'query',
        name: 'code',
        required: true,
        type: 'string',
      }],
    },
  },
  '/superadmin/code/': {
    get: {
      ...options,
      description: 'Get registration codes',
      responses: responses(swaggerPagination(getCode)),
      parameters: searchParams,
    },
    post: {
      ...options,
      description: 'Create registration code',
      responses: {
        200: { description: 'ok' },
      },
      parameters: code,
    },
    put: {
      ...options,
      description: 'Change registration code',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'codeId',
        required: true,
        type: 'string',
      }, ...code],
    },
    delete: {
      ...options,
      description: 'Change registration code',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'query',
        name: 'ids',
        required: true,
        type: 'array',
        items: {
          type: 'string',
        },
      }],
    },
  },
  '/superadmin/code/{id}': {
    get: {
      ...options,
      description: 'Get registration-code by id',
      responses: responses(getCode),
      parameters: [{
        in: 'path',
        name: 'id',
        required: true,
        type: 'string',
      }],
    },
  },
};
