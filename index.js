const config = require('./config/config');

const enableLoggerApi = true;
const enableAnalyticsApi = true;

if (enableLoggerApi) {
    const LoggerApi = require('rutilus-logger-node');
    LoggerApi(config);
}

if (enableAnalyticsApi) {
    const AnalyticsApi = require('rutilus-analytics-node-js');
    AnalyticsApi(config);
}