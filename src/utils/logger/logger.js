const winston = require('winston');
const logFile = require('../../../logs/error.log');

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  // transports: [
  //   new winston.transports.File({ filename: logFile, level: 'error' })
  // ]
});

module.exports = logger; 