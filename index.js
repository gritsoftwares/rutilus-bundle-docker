const config = require('./config/config');
const readKey = require('./utils/readKey');
const writeDatabaseConfig = require('./utils/writeDatabaseConfig');
const readLoggerFile = require('./utils/readLoggerFile');

const enableHeartbeat = false;
const enableLoggerApi = false;
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

    const rateLimit = {
        windowMs: 60 * 1000, // 1 minute
        delayAfter: 1000, // 300 connections
        delayMs: 0.5 * 1000, // 0.5 seconds
        max: 1000, // 1000 maximum connections
        handler: function () { throw 429; }
    };

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
        rateLimit,
        loggerConfig,
        extraInformation: config.extraInformation.logger
    });
}