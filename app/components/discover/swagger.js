const { options } = require('../../constants/swagger');
const { responses } = require('../../utils/responses/swagger');

options.tags = ['Discover'];

const parameters = [{
  in: 'body',
  name: 'identities',
  required: true,
  type: 'array',
  items: {
    type: 'object',
  },
}];
module.exports = {
  '/discover': {
    get: {
      ...options,
      description: 'Get discovers',
      responses: responses({
        discovers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              identity_name: {
                type: 'string',
              },
            },
          },
        },
      }),
    },
  },
  '/discover/identity/': {
    post: {
      ...options,
      description: 'Create discover identity',
      responses: responses(),
      parameters,
    },
    get: {
      ...options,
      description: 'Get discover identity',
      responses: responses({
        selected: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              identities: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    identity_name: {
                      type: 'string',
                    },
                    description: {
                      type: 'string',
                    },
                    impacts: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'string',
                          },
                          name: {
                            type: 'string',
                          },
                          discover_id: {
                            type: 'string',
                          },
                          rank: {
                            type: 'number',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }),
      parameters,
    },
  },
  '/discover/impact/': {
    get: {
      ...options,
      description: 'Get discover impacts',
      responses: responses({
        impacts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              discover_id: {
                type: 'string',
              },
              status: {
                type: 'string',
              },
              rank: {
                type: 'number',
              },
            },
          },
        },
      }),
    },
    post: {
      ...options,
      description: 'Create discover identity',
      responses: responses(),
      parameters: [{
        in: 'body',
        name: 'impacts',
        required: true,
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            discover_id: {
              type: 'string',
            },
            status: {
              type: 'string',
            },
            rank: {
              type: 'number',
            },
          },
        },
      }],
    },
  },
  '/discover/impact/:id': {
    get: {
      ...options,
      description: 'Get discover impacts',
      responses: responses({
        impact: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            discover_id: {
              type: 'string',
            },
            status: {
              type: 'string',
            },
          },
        },
      }),
      parameters: [{
        name: 'id',
        in: 'path',
        type: 'string',
      }],
    },
  },
  '/discover/impact-list/': {
    get: {
      ...options,
      description: 'Get impacts',
      responses: responses({
        impacts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              status: {
                type: 'string',
              },
            },
          },
        },
      }),
    },
  },
};
