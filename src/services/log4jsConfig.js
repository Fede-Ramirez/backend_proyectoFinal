const log4js = require("log4js");

log4js.configure({
    appenders: {
        console: { type: 'console' },
        errorFileAppender: {type: 'file', filename: './logs/errors.log'},
    },
    categories: {
        default: { appenders: ['console'], level: 'info' },
        errorLogger: { appenders: ['errorFileAppender'], level: 'error'},
    },
});

const logger = log4js.getLogger();

module.exports = logger;