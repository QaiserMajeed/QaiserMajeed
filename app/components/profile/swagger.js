const { responses } = require('../../utils/responses/swagger');
const {
  swaggerPagination,
  searchParams,
  options,
  profile,
  surveyProgress,
  fullSurveyProgress,
} = require('../../constants/swagger');

const profileForAdmin = {
  ...profile,
  surveyProgress,
};
const userProfile = {
  user: {
    type: 'object',
    properties: {
      ...profile,
      tokens: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            token: { type: 'string' },
          },
        },
      },
    },
  },
  token: {
    type: 'string',
  },
};

module.exports = {
  user: {
    '/profile': {
      get: {
        ...options,
        tags: ['Profile'],
        description: 'Profile',
        responses: responses(userProfile),
      },
    },
  },
  admin: {
    '/superadmin/profile/{id}': {
      get: {
        ...options,
        tags: ['Admin'],
        description: 'Get profile by id',
        responses: responses({
          ...profile,
          surveyProgress: fullSurveyProgress,
        }),
        parameters: [{
          in: 'path',
          name: 'id',
          required: true,
          type: 'string',
        }],
      },
    },
    '/superadmin/profile/all': {
      get: {
        ...options,
        tags: ['Admin'],
        description: 'Get profiles',
        responses: responses(swaggerPagination(profileForAdmin)),
        parameters: searchParams,
      },
    },
  },
};
