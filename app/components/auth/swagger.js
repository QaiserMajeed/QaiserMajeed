const { options } = require('../../constants/swagger');
const { responses } = require('../../utils/responses/swagger');

options.tags = ['Auth'];

module.exports = {
  '/auth/register': {
    post: {
      ...options,
      description: 'Register',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'firstName',
        required: true,
        type: 'string',
        example: 'first',
      }, {
        in: 'body',
        name: 'lastName',
        required: true,
        type: 'string',
        example: 'last',
      }, {
        in: 'body',
        name: 'email',
        required: true,
        type: 'string',
        example: 'email@gmail.com',
      }, {
        in: 'body',
        name: 'password',
        required: true,
        type: 'string',
        example: '111111',
      }, {
        in: 'body',
        name: 'advCode',
        required: true,
        type: 'string',
        example: 'string',
      }],
    },
  },
  '/auth/register-partner': {
    post: {
      ...options,
      description: 'Create partner',
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
        required: true,
        type: 'string',
      }, {
        in: 'body',
        name: 'email',
        required: true,
        type: 'string',
      }, {
        in: 'body',
        name: 'advCode',
        required: true,
        type: 'string',
      }, {
        in: 'body',
        name: 'password',
        required: true,
        type: 'string',
      }, {
        in: 'body',
        name: 'customerId',
        required: true,
        type: 'string',
      }],
    },
  },
  // '/auth/resend-otp': {
  //   post: {
  //     ...options,
  //     description: 'Resend otp',
  //     responses: {
  //       200: { description: 'ok' },
  //     },
  //     parameters: [{
  //       in: 'body',
  //       name: 'email',
  //       required: true,
  //       type: 'string',
  //       example: 'email@gmail.com',
  //     }],
  //   },
  // },
  // '/auth/verify-otp': {
  //   post: {
  //     ...options,
  //     description: 'Verify otp',
  //     responses: {
  //       200: { description: 'ok' },
  //     },
  //     parameters: [{
  //       in: 'body',
  //       name: 'email',
  //       required: true,
  //       type: 'string',
  //       example: 'email@gmail.com',
  //     }, {
  //       in: 'body',
  //       name: 'otp',
  //       required: true,
  //       type: 'integer',
  //       example: 1,
  //     }],
  //   },
  // },
  '/auth/login': {
    post: {
      ...options,
      description: 'Login',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'email',
        required: true,
        type: 'string',
        example: 'email@gmail.com',
      }, {
        in: 'body',
        name: 'password',
        required: true,
        type: 'string',
        example: 'string',
      }],
    },
  },
  '/auth/login-partner': {
    post: {
      ...options,
      description: 'Login partner',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'email',
        required: true,
        type: 'string',
        example: 'email@gmail.com',
      }, {
        in: 'body',
        name: 'password',
        required: true,
        type: 'string',
        example: 'string',
      }],
    },
  },
  // '/auth/register-super-admin': {
  //   post: {
  //     ...options,
  //     description: 'Add super admin',
  //     responses: {
  //       200: { description: 'ok' },
  //     },
  //   },
  // },
  // '/auth/check/login': {
  //   post: {
  //     ...options,
  //     description: 'Check Login',
  //     responses: {
  //       200: { description: 'ok' },
  //     },
  //     parameters: [{
  //       in: 'body',
  //       name: 'token',
  //       required: true,
  //       type: 'string',
  //       example: 'string',
  //     }],
  //   },
  // },
  // '/auth/login/admin/portal': {
  //   post: {
  //     ...options,
  //     description: 'Admin portal login',
  //     responses: {
  //       200: { description: 'ok' },
  //     },
  //     parameters: [{
  //       in: 'body',
  //       name: 'email',
  //       required: true,
  //       type: 'string',
  //       example: 'email@gmail.com',
  //     }, {
  //       in: 'body',
  //       name: 'password',
  //       required: true,
  //       type: 'string',
  //       example: '111111',
  //     }],
  //   },
  // },
  '/auth/reset/:token': {
    get: {
      ...options,
      description: 'Reset password link',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'path',
        name: 'token',
        required: true,
        type: 'string',
        example: 'string',
      }],
    },
    post: {
      ...options,
      description: 'Reset password',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'password',
        required: true,
        type: 'string',
        example: '111111',
      }, {
        in: 'body',
        name: 'confirm_password',
        required: true,
        type: 'string',
        example: '111111',
      }, {
        in: 'path',
        name: 'token',
        required: true,
        type: 'string',
        example: 'string',
      }],
    },
  },
  '/auth/forgot-password': {
    post: {
      ...options,
      description: 'Forgot password',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'email',
        required: true,
        type: 'string',
        example: 'email@gmail.com',
      }],
    },
  },
  '/auth/logout': {
    post: {
      ...options,
      description: 'Logout',
      responses: {
        200: { description: 'ok' },
      },
      parameters: [{
        in: 'body',
        name: 'email',
        required: true,
        type: 'string',
        example: 'email@gmail.com',
      }],
    },
  },
  '/auth/generate-password': {
    get: {
      ...options,
      description: 'Reset password link',
      responses: responses({
        password: {
          type: 'string',
        },
      }),
    },
  },
  // '/auth/process-payment': {
  //   post: {
  //     ...options,
  //     description: 'Registration payment',
  //     responses: {
  //       200: { description: 'ok' },
  //     },
  //     parameters: [{
  //       in: 'body',
  //       name: 'coupon',
  //       required: true,
  //       type: 'string',
  //       example: 'coupon',
  //     }, {
  //       in: 'body',
  //       name: 'token',
  //       required: true,
  //       type: 'string',
  //       example: 'string',
  //     }],
  //   },
  // },
};
