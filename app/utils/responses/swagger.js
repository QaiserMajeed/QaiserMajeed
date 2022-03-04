exports.responses = (payload, type = 'object') => ({
  '200-error': {
    description: 'error',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'boolean',
        },
        message: {
          type: 'string',
          example: 'error message',
        },
        payload: {
          type: 'array',
          items: {
            type: 'string',
            example: [],
          },
        },
      },
    },
  },
  '200-successful': {
    description: 'ok',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'boolean',
          example: false,
        },
        message: {
          type: 'string',
          example: 'successful',
        },
        ...(payload ? {
          payload: {
            type,
            ...(type !== 'array' && {
              properties: {
                ...payload,
              },
            }),
            ...(type === 'array' && {
              ...payload,
            }),
          },
        } : {
          payload: {
            type: 'array',
            items: {
              type: 'string',
              example: [],
            },
          },
        }),
      },
    },
  },
});
