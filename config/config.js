const fs = require('fs');
const ENV = process.env;

// Rutilus URL (without a / at the end)
const rutilusAddress = 'http://yoursite.com';

// Configuration for the database
const dbUsername = 'dbUsername'; // Username
const dbPassword = 'dbPassword'; // Password
const dbDatabase = 'production'; // Database
const dbAuthMechanism = 'DEFAULT'; // Authentication mechanism (default: DEFAULT)
const dbAuthSource = 'admin'; // Authentication source database

function readKeyFile(file) {
    return fs.readFileSync(`${__dirname}/keys/${file}`).toString();
}

module.exports = {
    useHttps: false,

    ports: {
        logger: 8080,
        analytics: 3000
    },

    addresses: {
        database: (
            ENV.MONGOCONTAINER_PORT &&
            ENV.MONGOCONTAINER_PORT
                .replace('tcp', 'mongodb')
                .replace('://', `://${$dbUsername}:${dbPassword}@`) +
                `/${dbDatabase}?authenticationMechanism=${dbAuthMechanism}&authSource=${dbAuthSource}`
        ) || 'mongodb://localhost:27017',
        analytics: `${rutilusAddress}:3000`,
    },

    // optional (depends on useHttps)
    httpsKeys: {
        key:  readKeyFile('key.key'),
        cert: readKeyFile('cert.crt'),
        ca:   readKeyFile('ca.crt'),
    },


    heartbeatAddresses: [
        {
            title: 'Logger API',
            address: `${rutilusAddress}`,
            useHttps: true,
            logDirectory: '/logs',
            logFile: 'logger.log',
            timeSpan: 10000,
            maxFileSizeBytes: 1000000,
            crashWhenFail: true,
        }, {
            title: 'Analytics API',
            address: `${rutilusAddress}:3000/ping`,
            useHttps: true,
            logDirectory: '/logs',
            logFile: 'analytics.log',
            timeSpan: 10000,
            maxFileSizeBytes: 1000000,
            crashWhenFail: true,
        }
    ],

    errorLog: {
        logger: {
            console: {
                level: 'info'
            },
            file: {
                level: 'info',
                file: 'loggerApi.log'
            }
        },

        analytics: {
            console: {
                level: 'info'
            },
            file: {
                level: 'info',
                file: 'analyticsApi.log'
            }
        },
    },

    extraInformation: [],

    rateLimits: {
        all: {
            windowMs: 60 * 1000, // 1 minute
            delayAfter: 1000, // 300 connections
            delayMs: 0.5 * 1000, // 0.5 seconds
            max: 1000, // 1000 maximum connections
        }
    },

    affinityTool: {
        cacheTime: 86400000,
        minHitTimeOnPage: 2000
    },

    transporter: {
        service: ENV.RUTILUS_TRANSPORTER_SERVICE || '',
        auth: {
            user: ENV.RUTILUS_TRANSPORTER_EMAIL || '',
            pass: ENV.RUTILUS_TRANSPORTER_PASSWORD || '',
        }
    },

};