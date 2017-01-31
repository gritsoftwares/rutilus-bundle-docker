const config = require('./config/config');
const readKey = require('./utils/readKey');
const writeDatabaseConfig = require('./utils/writeDatabaseConfig');
const readLoggerFile = require('./utils/readLoggerFile');

const enableHeartbeat = false;
const enableLoggerApi = false;
const enableAnalyticsApi = true;
const httpsKeys = {};
const databaseConfig = {};

if (config.useHTTPS) {
    httpsKeys.key  = readKey(config.https.key);
    httpsKeys.cert = readKey(config.https.cert);
    httpsKeys.ca   = readKey(config.https.ca);
}

writeDatabaseConfig(config.database, databaseConfig);

if (enableHeartbeat) {
    const APIHeartbeat = require('rutilus-apiheartbeat-node');

    APIHeartbeat(config.heartbeatAddresses, 5000);
}

if (enableLoggerApi) {
    const LoggerApi = require('rutilus-logger-node');

    const loggerConfig = {
        console: {
            level: 'silly',
        },
        file: {
            level: 'warn',
            filename: readLoggerFile(config.logFiles.loggerApi)
        }
    };

    LoggerApi({
        port: 8080,
        useHttps: config.useHTTPS,
        httpsKeys,
        databaseAddress: databaseConfig.fullAddress,
        maxConnectionTries: 10,
        rateLimit: config.rateLimit.logger,
        loggerConfig,
        extraInformation: config.extraInformation
    });
}

if (enableAnalyticsApi) {
    const AnalyticsApi = require('../rutilus-analytics-node-js');

    const loggerConfig = {
        console: {
            level: 'silly',
        },
        file: {
            level: 'warn',
            filename: readLoggerFile(config.logFiles.analyticsApi)
        }
    };

    AnalyticsApi({
        port: 3000,
        useHttps: config.useHTTPS,
        httpsKeys,
        databaseAddress: databaseConfig.fullAddress,
        rateLimit: config.rateLimit.analytics,
        loggerConfig,
        affinityTool: config.affinityTool,
        userAccounts: config.dashboard.userAccounts,
        addresses: config.addresses,
        extraInformation: config.extraInformation
    });
}