const winston = require('winston');
const logFile = '../../../logs/error.log';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      level: 'error',
      filename: logFile,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});

module.exports = logger;



// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.File({
//       level: 'info',
//       filename: logFile,
//       format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.json()
//       )
//     })
//   ]
// });

// module.exports = logger; 


// const logger = winston.createLogger({
//   level: 'error',
//   format: winston.format.json(),
//   // transports: [
//   //   new winston.transports.File({ filename: logFile, level: 'error' })
//   // ]
// });