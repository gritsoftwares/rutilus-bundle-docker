const config = require('./config/config');

const enableHeartbeat = true;
const enableLoggerApi = true;
const enableAnalyticsApi = true;

if (enableHeartbeat) {
    const APIHeartbeat = require('rutilus-apiheartbeat-node');
    APIHeartbeat(config.heartbeatAddresses, 5000);
}

if (enableLoggerApi) {
    const LoggerApi = require('rutilus-logger-node');
    LoggerApi(config);
}

if (enableAnalyticsApi) {
    const AnalyticsApi = require('rutilus-analytics-node-js');
    AnalyticsApi(config);
}