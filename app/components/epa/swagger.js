const { options } = require('../../constants/swagger');

options.tags = ['Employees'];

module.exports = {
  '/epa/check-code': {
    post: {
      ...options,
      description: 'Check EPAcode',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'code',
        required: true,
        type: 'string',
        example: 'code',
      }],
    },
  },
  '/epa/registration-code': {
    post: {
      ...options,
      description: 'Create EPAcode',
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
        name: 'initial_count',
        required: true,
        type: 'string',
        example: 'code',
      }, {
        in: 'body',
        name: 'title',
        required: true,
        type: 'string',
        example: 'code',
      }, {
        in: 'body',
        name: 'owner',
        required: true,
        type: 'string',
        example: 'code',
      }, {
        in: 'body',
        name: 'company_id',
        required: true,
        type: 'string',
        example: 'code',
      }],
    },
  },
  '/epa/cohorts': {
    get: {
      ...options,
      description: 'Get EPA cohorts',
      responses: {
        200: { description: 'ok' },
      },
    },
  },
  '/epa/results': {
    post: {
      ...options,
      description: 'Get EPA results',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'cohort',
        required: true,
        type: 'string',
        example: 'cohort',
      }],
    },
  },
  '/epa/team-reports': {
    post: {
      ...options,
      description: 'Get team reports',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'cohort',
        required: true,
        type: 'string',
        example: 'cohort',
      }],
    },
  },
  '/epa/codes': {
    get: {
      ...options,
      description: 'Get EPA codes',
      responses: {
        200: { description: 'ok' },
      },
    },
  },
  '/epa/individual-report': {
    post: {
      ...options,
      description: 'Create individual report',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'form_response',
        required: true,
        type: 'string',
        example: 'cohort',
      }],
    },
  },
  '/epa/individual-report/:epa_id': {
    get: {
      ...options,
      description: 'Get EPA codes',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'path',
        name: 'epa_id',
        required: true,
        type: 'string',
        example: 'cohort',
      }],
    },
  },
  '/epa/team-report/': {
    post: {
      ...options,
      description: 'Create team',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'team_name',
        required: true,
        type: 'string',
        example: 'cohort',
      }, {
        in: 'body',
        name: 'members',
        required: true,
        type: 'string',
        example: 'cohort',
      }],
    },
  },
  '/epa/team-report/:id': {
    get: {
      ...options,
      description: 'Get team results',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'path',
        name: 'id',
        required: true,
        type: 'string',
        example: 'cohort',
      }],
    },
  },
};
