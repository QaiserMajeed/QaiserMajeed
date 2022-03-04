const router = require('express').Router();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const paths = require('./swagger-paths');

const swaggerOptions = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: "API's Documentation",
      description: 'GoBeyond api documentation.',
      contact: { name: 'Jonathan' },
      version: '1.0.0',
      // servers: [`${process.env.APP_URL}:${process.env.APP_PORT}`],
    },
    host: ['onix-systems-gobeyond-backend.staging.onix.ua'],
    // host: ['localhost:4400'],
    // host: [`${process.env.APP_URL}:${process.env.APP_PORT}`],
    basePath: '/api',
    schemes: ['https', 'http'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    paths,
  },
  apis: ['../app/components/router'],
};
router.use('/api-docs', swaggerUi.serve,
  (req, res, next) => {
    const { username, key } = req.query;
    if (
      username
      && key
      && username === process.env.SWAGGER_USERNAME
      && key === process.env.SWAGGER_KEY
    ) return next();
    res.status(401).json({ code: 401, message: 'Un-authorized access' });
  });
router.get('/api-docs', swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

module.exports = router;
