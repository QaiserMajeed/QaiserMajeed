const { responses } = require('../../utils/responses/swagger');
const { options } = require('../../constants/swagger');

options.tags = ['Impact'];

const completed = { type: 'boolean' };

const lifePurpose = {
  completed,
  year: { type: 'string' },
  city: { type: 'string' },
  familyClass: { type: 'string' },
  familyRelations: { type: 'string' },
  immediateFamily: { type: 'string' },
  college: { type: 'string' },
  major: { type: 'string' },
  industry: { type: 'string' },
  position: { type: 'string' },
  childLove: { type: 'string' },
  career: { type: 'string' },
  momInspired: { type: 'string' },
  momTaught: { type: 'string' },
  dadInspired: { type: 'string' },
  dadTaught: { type: 'string' },
  parentsLesson: { type: 'string' },
  adultDecision: { type: 'string' },
  adversity: { type: 'string' },
  talent1: { type: 'string' },
  talent2: { type: 'string' },
  talent3: { type: 'string' },
  teachAbout: { type: 'string' },
  improveArea: { type: 'string' },
  mainPassion: { type: 'string' },
  passion1: { type: 'string' },
  passion2: { type: 'string' },
  passion3: { type: 'string' },
  peopleHelp: { type: 'string' },
  helpReason: { type: 'string' },
  purposeVerb: { type: 'string' },
  purposeComponent: { type: 'string' },
  purposeStatement: { type: 'string' },
  purposeOutcome: { type: 'string' },
  purposeFinal: { type: 'string' },
  feedbackRate: { type: 'number' },
  teamFeedback: { type: 'string' },
};
const promiseStatements = {
  promiseVerb: { type: 'string' },
  promiseComponent: { type: 'string' },
  finalPromise: { type: 'string' },
  completed,
};

module.exports = {
  '/impact/': {
    get: {
      ...options,
      description: 'Get All',
      responses: responses({
        lifePurpose: {
          lifePurpose: 'object',
          properties: lifePurpose,
        },
        promiseStatements: {
          type: 'object',
          properties: promiseStatements,
        },
        completed,
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
        example: 'name',
      }, {
        in: 'body',
        name: 'step',
        required: true,
        type: 'string',
        enum: ['lifePurpose, promiseStatements', 'completed'],
      }, {
        in: 'body',
        name: 'value',
        required: true,
        type: ['string', 'integer', 'boolean'],
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
        name: 'lifePurpose',
        required: true,
        type: 'object',
        properties: lifePurpose,
      }, {
        in: 'body',
        name: 'promiseStatements',
        required: true,
        type: 'object',
        properties: promiseStatements,
      }],
    },
  },
  '/score/score': {
    get: {
      ...options,
      description: 'Get Score',
      responses: responses({
        score: {
          type: 'object',
          properties: {
            ...lifePurpose,
            result: {
              type: 'number',
            },
          },
        },
      }),
    },
  },
  '/impact/life-purpose': {
    get: {
      ...options,
      description: 'Get Life Purpose',
      responses: responses({
        lifePurpose: {
          type: 'object',
          properties: lifePurpose,
        },
      }),
    },
  },
  '/impact/promise-statements': {
    get: {
      ...options,
      description: 'Get Promise Statements',
      responses: responses({
        promiseStatements: {
          type: 'object',
          properties: promiseStatements,
        },
      }),
    },
  },
};
