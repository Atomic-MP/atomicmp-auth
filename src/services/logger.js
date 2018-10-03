const winston = require('winston');
const { ENV } = process.env;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    ...(ENV === 'development'
      ? []
      : [
          new winston.transports.File({
            filename: 'logs/errors.log',
            level: 'error',
          }),
          new winston.transports.File({ filename: 'logs/output.log' }),
        ]),
  ],
});

module.exports = logger;
