const mongoose = require("mongoose");
const logger = require("../app/utils/logger/logger");
// const host = process.env.DB_PORT ? `${process.env.DB_HOST}:${process.env.DB_PORT}` : process.env.DB_HOST;
// const url = `${process.env.DB_CONNECTION}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${host}/${process.env.DB_DATABASE}?${process.env.DB_OPTIONS}`;\
const url = 'mongodb+srv://admin:3L5YIxvv6xnC@gb-v2.ad04m.mongodb.net/gb?retryWrites=true&w=majority';
// const url = "mongodb://localhost:27017/gb";
console.log("DB: ", url)
console.log("stripe: ", process.env.STRIPE_SECRET_KEY)
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => logger.info("Connected to mongoDB"))
  .catch((err) => logger.error(err));
