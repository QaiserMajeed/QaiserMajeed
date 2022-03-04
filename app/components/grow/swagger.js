const { responses } = require('../../utils/responses/swagger');
const { options } = require('../../constants/swagger');
const growConstants = require('../../constants/grow');
const { getSituations } = require('./service');

options.tags = ['Grow'];
const template = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
      },
      value: {
        type: 'number',
      },
    },
  },
};
const situations = getSituations(template);
const result = {
  type: 'array',
  properties: {
    type: 'object',
  },
  example: [
    { category: 'visionary', score: 2 },
    { category: 'catalyst', score: 2 },
    { category: 'analyst', score: 2 },
    { category: 'companion', score: 2 },
  ],
};
// const result = {
//   type: 'array',
//   properties: {
//     type: 'object',
//   },
//   example: [
//     { category: 'cooperating', score: 2 },
//     { category: 'directing', score: 2 },
//     { category: 'compromising', score: 2 },
//     { category: 'avoiding', score: 2 },
//     { category: 'harmonizing', score: 2 },
//   ],
// };

module.exports = {
  '/grow/': {
    get: {
      ...options,
      description: 'Get All',
      responses: responses({
        completed: {
          type: 'boolean',
        },
        situations: {
          situations: 'object',
          properties: situations,
        },
      }),
    },
    put: {
      ...options,
      description: 'Update Field',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'field',
        required: true,
        type: 'string',
        enum: [growConstants.fields.completed],
      }, {
        in: 'body',
        name: 'value',
        required: true,
        // type: ['string', 'boolean', 'array'],
        type: 'boolean',
        example: true,
      }],
    },
    post: {
      ...options,
      description: 'Create Impact',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'completed',
        required: true,
        type: 'boolean',
      }, {
        in: 'body',
        name: 'situations',
        required: true,
        type: 'string',
        properties: template,
      }],
    },
  },
  '/grow/{situation}': {
    get: {
      ...options,
      description: 'Get Situation',
      responses: responses({
        situations: {
          situations: 'object',
          properties: situations,
        },
      }),
    },
  },
  '/grow/result': {
    get: {
      ...options,
      description: 'Get Situation',
      responses: responses({
        completed: {
          type: 'boolean',
        },
        situations: {
          situations: 'object',
          properties: {
            result,
          },
        },
      }),
    },
  },
};
