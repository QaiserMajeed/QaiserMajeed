const { responses } = require('../../utils/responses/swagger');
const { options } = require('../../constants/swagger');
const trialstriumphsConstants = require('../../constants/align');

options.tags = ['Align'];

module.exports = {
  '/align': {
    get: {
      ...options,
      description: 'Get align',
      responses: responses({
        trials: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        triumphs: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        importantTrials: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        importantTriumphs: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        completed: {
          type: 'boolean',
        },
      }),
    },
    post: {
      ...options,
      description: 'Create align',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'trials',
        required: true,
        type: 'array',
        items: {
          type: 'string',
        },
      }, {
        in: 'body',
        name: 'triumphs',
        required: true,
        type: 'array',
        items: {
          type: 'string',
        },
      }, {
        in: 'body',
        name: 'importantTrials',
        required: true,
        type: 'array',
        items: {
          type: 'string',
        },
      }, {
        in: 'body',
        name: 'importantTriumphs',
        required: true,
        type: 'array',
        items: {
          type: 'string',
        },
      }, {
        in: 'body',
        name: 'completed',
        required: true,
        type: 'boolean',
        example: true,
      }],
    },
    put: {
      ...options,
      description: 'Update field',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'field',
        required: true,
        type: 'string',
        enum: Object.values(trialstriumphsConstants),
      }, {
        in: 'body',
        name: 'value',
        required: true,
        type: ['array', 'string'],
      }],
    },
  },
  '/align/result': {
    get: {
      ...options,
      description: 'Get align',
      responses: responses({
        importantTrials: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        importantTriumphs: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        completed: {
          type: 'boolean',
        },
      }),
    },
  },
};
