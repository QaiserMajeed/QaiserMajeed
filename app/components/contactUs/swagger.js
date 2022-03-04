const { options } = require('../../constants/swagger');

options.tags = ['Contact Us'];

module.exports = {
  '/contact-us': {
    post: {
      ...options,
      description: 'Contact Us',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'firstName',
        required: true,
        type: 'string',
      }, {
        in: 'body',
        name: 'lastName',
        required: false,
        type: 'string',
      }, {
        in: 'body',
        name: 'email',
        required: true,
        type: 'string',
      }],
    },
  },
};
