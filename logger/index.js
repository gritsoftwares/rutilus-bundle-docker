const config = require('./config/config');

if (config.enableLogger) {
    const LoggerApi = require('rutilus-logger-node');
    LoggerApi(config);
}
