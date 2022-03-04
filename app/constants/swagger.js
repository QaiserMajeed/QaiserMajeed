module.exports = {
  options: {
    security: [{ authenticate: [] }],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  swaggerPagination(data) {
    return {
      pagination: {
        type: 'object',
        properties: {
          totalCount: {
            type: 'number',
          },
          page: {
            type: 'number',
          },
          totalPages: {
            type: 'number',
          },
          perPage: {
            type: 'number',
          },
        },
      },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: data,
        },
      },
    };
  },
  user: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      email: { type: 'string' },
    },
  },
  searchParams: [
    {
      in: 'query',
      name: 'skip',
      required: false,
      type: 'number',
      example: 0,
    },
    {
      in: 'body',
      name: 'limit',
      required: false,
      type: 'number',
      example: 10,
    },
    {
      in: 'body',
      name: 'search',
      required: false,
      type: 'string',
      example: 'test',
    },
  ],
  profile: {
    _id: {
      type: 'string',
    },
    first_name: {
      type: 'string',
    },
    last_name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    user_type: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
      example: '2021-04-23T09:09:40.885+00:00',
    },
  },
  surveyProgress: {
    type: 'object',
    example: {
      score: {
        stages: {
          purposeScore: false,
          purposeDNA: false,
          emotionalIntl: false,
        },
        completed: false,
      },
      align: {
        completed: false,
      },
      impact: {
        stages: {
          myLifePurpose: false,
          promiseStatements: false,
        },
        completed: false,
      },
      grow: {
        completed: false,
      },
    },
  },
  fullSurveyProgress: {
    type: 'object',
    example: {
      score: {
        score: 1,
        emotionalIntl: 1,
        DNA: {
          impacts: [
            {
              identity: 'string',
              verb: 'string',
              rank: 1,
            },
            {
              identity: 'string',
              verb: 'string',
              rank: 1,
            },
            {
              identity: 'string',
              verb: 'string',
              rank: 1,
            },
          ],
          identities: [
            'string',
            'string',
            'string',
          ],
        },
        completed: true,
      },
      align: {
        importantTrials: [
          'string',
          'string',
          'string',
        ],
        importantTriumphs: [
          'string',
          'string',
          'string',
        ],
        completed: true,
      },
      impact: {
        completed: true,
        lifePurpose: {
          completed: true,
          year: 'string',
          city: 'string',
          familyClass: 'string',
          familyRelations: 'string',
          immediateFamily: 'string',
          college: 'string',
          major: 'string',
          industry: 'string',
          position: 'string',
          childLove: 'string',
          career: 'string',
          momInspired: 'string',
          momTaught: 'string',
          dadInspired: 'string',
          dadTaught: 'string',
          parentsLesson: 'string',
          adultDecision: 'string',
          adversity: 'string',
          talent1: 'string',
          talent2: 'string',
          talent3: 'string',
          teachAbout: 'string',
          improveArea: 'string',
          mainPassion: 'string',
          passion1: 'string',
          passion2: 'string',
          passion3: 'string',
          peopleHelp: 'string',
          helpReason: 'string',
          purposeVerb: 'string',
          purposeComponent: 'string',
          purposeStatement: 'string',
          purposeOutcome: 'string',
          purposeFinal: 'string',
          feedbackRate: 1,
          teamFeedback: 'string',
        },
        promiseStatements: {
          completed: true,
          promiseVerb: 'string',
          promiseComponent: 'string',
          finalPromise: 'string',
        },
      },
      grow: {
        situations: {
          comfort: [
            {
              category: 'visionary',
              score: 1,
            },
            {
              category: 'catalyst',
              score: 1,
            },
            {
              category: 'analyst',
              score: 1,
            },
            {
              category: 'campanion',
              score: 1,
            },
          ],
        },
      },
    },
  },
};
