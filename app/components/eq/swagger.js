const { options } = require('../../constants/swagger');

options.tags = ['emotionalIntl'];

module.exports = {
  '/eq': {
    
    post: {
      ...options,
      description: 'Create EQ',
      responses: {
        200: { description: 'ok' },
      },
    },
  },
};
