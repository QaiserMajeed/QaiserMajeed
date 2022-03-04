const { options } = require('../../constants/swagger');

options.tags = ['accessTokens'];

module.exports = {
  '/accessTokens': {
    
    post: {
      ...options,
      description: 'Create acesss Token',
      responses: {
        200: { description: 'ok' },
      },
    },
  },
};
