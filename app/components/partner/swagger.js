const { responses } = require('../../utils/responses/swagger');
const {
  options,
  searchParams,
  swaggerPagination,
  profile,
  surveyProgress,
  fullSurveyProgress,
} = require('../../constants/swagger');

options.tags = ['Admin'];

const userProfile = {
  ...profile,
  surveyProgress,
};

const partner = {
  ...userProfile,
  advCode: { type: 'string' },
  initialRegistrationsLimit: { type: 'number' },
  currentRegistrationsLimit: { type: 'number' },
};

module.exports = {
  '/partner/profile': {
    get: {
      ...options,
      tags: ['Partner'],
      description: 'Get partner profile',
      responses: responses(partner),
    },
  },
  '/partner/users': {
    get: {
      ...options,
      tags: ['Partner'],
      description: 'Get partner users',
      responses: responses(swaggerPagination(userProfile)),
      parameters: searchParams,
    },
  },
  '/partner/users/{id}': {
    get: {
      ...options,
      tags: ['Partner'],
      description: 'Get partner',
      responses: responses({
        ...userProfile,
        surveyProgress: fullSurveyProgress,
      }),
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          type: 'string',
        },
      ],
    },
  },
  '/superadmin/partner/': {
    get: {
      ...options,
      description: 'Get partners',
      responses: responses(swaggerPagination(partner)),
      parameters: searchParams,
    },
    put: {
      ...options,
      description: 'Change partner',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [
        {
          in: 'body',
          name: 'id',
          required: true,
          type: 'string',
        },
        {
          in: 'body',
          name: 'initialRegistrationsLimit',
          required: true,
          type: 'number',
        },
      ],
    },
  },
  '/superadmin/partner/{id}': {
    get: {
      ...options,
      description: 'Get partners',
      responses: responses(partner),
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          type: 'string',
        },
      ],
    },
  },
};
