const { responses } = require('../../utils/responses/swagger');
const { options } = require('../../constants/swagger');

options.tags = ['Purpose'];
const purposeScoreParameters = [{
  in: 'body',
  name: 'name',
  required: true,
  type: 'string',
}, {
  in: 'body',
  name: 'ageRange',
  required: true,
  type: 'string',
}, {
  in: 'body',
  name: 'email',
  required: true,
  type: 'string',
}, {
  in: 'body',
  name: 'day',
  required: true,
  type: 'integer',
}, {
  in: 'body',
  name: 'life',
  required: true,
  type: 'integer',
}, {
  in: 'body',
  name: 'lifeIncludes',
  required: true,
  type: 'integer',
}, {
  in: 'body',
  name: 'personalExistence',
  required: true,
  type: 'integer',
}, {
  in: 'body',
  name: 'goals',
  required: true,
  type: 'integer',
}, {
  in: 'body',
  name: 'dreams',
  required: true,
  type: 'integer',
}, {
  in: 'body',
  name: 'legacy',
  required: true,
  type: 'integer',
}, {
  in: 'body',
  name: 'lifeControl',
  required: true,
  type: 'integer',
}, {
  in: 'body',
  name: 'currentMissions',
  required: true,
  type: 'integer',
}, {
  in: 'body',
  name: 'purpose',
  required: true,
  type: 'integer',
}];

const scoreResponse = {
  name: {
    type: 'string',
  },
  ageRange: {
    type: 'string',
  },
  email: {
    type: 'string',
  },
  day: {
    type: 'integer',
  },
  life: {
    type: 'integer',
  },
  lifeIncludes: {
    type: 'integer',
  },
  personalExistence: {
    type: 'integer',
  },
  goals: {
    type: 'integer',
  },
  dreams: {
    type: 'integer',
  },
  legacy: {
    type: 'integer',
  },
  lifeControl: {
    type: 'integer',
  },
  currentMissions: {
    type: 'integer',
  },
  purpose: {
    type: 'integer',
  },
};
const DNAResponse = {
  identities: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
  impacts: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        verb: {
          type: 'string',
        },
        rank: {
          type: 'integer',
        },
        identity: {
          type: 'string',
        },
      },
    },
  },
};

const emotionalIntl = {
  relateToExperience: { type: 'integer' },
  easyToAsk: { type: 'integer' },
  peopleIChoose: { type: 'integer' },
  financialSatisfied: { type: 'integer' },
  financialDecisions: { type: 'integer' },
  ableToUnderstand: { type: 'integer' },
  financialAsking: { type: 'integer' },
  financialHelp: { type: 'integer' },
  financialProblems: { type: 'integer' },
  financialDiffers: { type: 'integer' },
  adapt: { type: 'integer' },
  moneyPressure: { type: 'integer' },
  thinkingDecisions: { type: 'integer' },
  feelGrateful: { type: 'integer' },
  outlook: { type: 'integer' },
};

module.exports = {
  '/score/': {
    get: {
      ...options,
      description: 'Get All',
      responses: responses({
        score: {
          type: 'object',
          properties: scoreResponse,
        },
        DNA: {
          type: 'object',
          properties: DNAResponse,
        },
        emotionalIntl: {
          type: 'object',
          properties: emotionalIntl,
        },
        completed: {
          type: 'boolean',
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
        example: 'name',
      }, {
        in: 'body',
        name: 'step',
        required: true,
        type: 'string',
        enum: ['score, DNA', 'emotionalIntl', 'pulse', 'completed'],
      }, {
        in: 'body',
        name: 'value',
        required: true,
        type: ['string', 'integer'],
        example: 1,
      }],
    },
    post: {
      ...options,
      description: 'Create Purpose',
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
        name: 'score',
        required: true,
        type: 'object',
        properties: scoreResponse,
      }, {
        in: 'body',
        name: 'DNA',
        required: true,
        type: 'object',
        properties: DNAResponse,
      }, {
        in: 'body',
        name: 'emotionalIntl',
        required: true,
        type: 'object',
        properties: emotionalIntl,
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
            ...scoreResponse,
            result: {
              type: 'number',
            },
          },
        },
      }),
    },
  },
  '/score/dna': {
    get: {
      ...options,
      description: 'Get Score',
      responses: responses({
        DNA: {
          type: 'object',
          properties: DNAResponse,
        },
      }),
    },
  },
  '/score/emotionalIntl': {
    get: {
      ...options,
      description: 'Get emotionalIntl',
      responses: responses({
        emotionalIntl: {
          type: 'object',
          properties: emotionalIntl,
        },
      }),
    },
  },
  '/score/result': {
    get: {
      ...options,
      description: 'Get Score',
      responses: responses({
        score: {
          type: 'number',
        },
        DNA: {
          type: 'object',
          properties: DNAResponse,
        },
        emotionalIntl: {
          type: 'number',
        },
        completed: {
          type: 'boolean',
        },
      }),
    },
  },
  '/score/calc-score': {
    post: {
      ...options,
      tags: ['Purpose Score'],
      description: 'Calc purpose score (not authorized users)',
      responses: responses({
        score: {
          type: 'number',
        },
      }),
      parameters: purposeScoreParameters,
    },
  },
};
