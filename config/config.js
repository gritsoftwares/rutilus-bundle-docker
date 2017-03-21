/**
 * This is the master config file for the bundle. It is accessed by
 * the index.js files in both "logger" and "analytics" top level directories.
 */

const fs = require('fs');
const ENV = process.env;

// Rutilus URL (with http:// and without a / at the end)
// Pulled from the file that the user completing the tutorial
// will have appended to by now.
const rutilusAddress = `http://${require('./elasticIp')}`;

// Configuration for the database
const dbUsername = ENV.DB_USERNAME; // Username
const dbPassword = ENV.DB_PASSWORD; // Password
const dbDatabase = 'production'; // Database
const dbAuthMechanism = 'DEFAULT'; // Authentication mechanism (default: DEFAULT)
const dbAuthSource = 'admin'; // Authentication source database

function readKeyFile(file) {
    return fs.readFileSync(`${__dirname}/keys/${file}`).toString();
}

module.exports = {
    enableLogger: ENV.RUTILUS_ENABLE_LOGGER || true,

    enableAnalytics: ENV.RUTILUS_ENABLE_ANALYTICS || true,

    useHttps: ENV.RUTILUS_USE_HTTPS || false,

    ports: {
        logger: 8080,
        analytics: 3000
    },

    addresses: {
        database: `mongodb://${dbUsername}:${dbPassword}@`) +
            `/${dbDatabase}?authenticationMechanism=${dbAuthMechanism}&authSource=${dbAuthSource}`,
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

    extraInformation: [
      {
        {
          label: 'Car Category',
          fieldName: 'carCategory',
          type: 'String',
          target: 'resources',
          inAffinityUser: true,
          inAffinityPersona: true,
          inAffinityProfile: true
        }
      }
    ],

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
