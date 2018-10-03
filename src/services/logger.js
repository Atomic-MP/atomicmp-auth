const winston = require('winston');
const { ENV } = process.env;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    ...(ENV !== 'develop'
      ? [
          new winston.transports.Console({
            format: winston.format.simple(),
          }),
        ]
      : [
          new winston.transports.File({
            filename: 'error.log',
            level: 'error',
          }),
          new winston.transports.File({ filename: '../../.logs/output.log' }),
        ]),
  ],
});

module.exports = logger;
