const fs = require('fs');
const ENV = process.env;

// Rutilus URL (without a / at the end)
const rutilusAddress = 'http://yoursite.com';

// Configuration for the database
const dbUsername = 'dbUsername'; // Username
const dbPassword = 'dbPassword'; // Password

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
        database: 'mongodb://localhost:27017',
        analytics: `${rutilusAddress || 'http://localhost'}:3000`,
    },

    // optional (depends on useHttps)
    //httpsKeys: {
    //    key:  readKeyFile('key.key'),
    //    cert: readKeyFile('cert.crt'),
    //    ca:   readKeyFile('ca.crt'),
    //},

    errorLog: {
        logger: {
            console: {
                level: 'info'
            },
            file: {
                level: 'info',
                file: `/logs/loggerApi.log`
            }
        },

        analytics: {
            console: {
                level: 'info'
            },
            file: {
                level: 'info',
                file: `/logs/analyticsApi.log`
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