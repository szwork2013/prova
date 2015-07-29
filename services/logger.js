var winston = require('winston');

var logger = function(config){
    return new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({ json: true, timestamp: true}),
            new winston.transports.File({ filename: config.log_dir + 'debug.log', json: false })
        ],
        exceptionHandlers: [
            new (winston.transports.Console)({ json: false, timestamp: true }),
            new winston.transports.File({ filename: config.log_dir + 'exceptions.log', json: false })
        ],
        exitOnError: false,

    });
}

module.exports = logger;




