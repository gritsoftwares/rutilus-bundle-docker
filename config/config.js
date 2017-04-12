/**
 * This is the master config file for the bundle. It is accessed by
 * the index.js files in both "logger" and "analytics" top level directories.
 */

const fs = require('fs');
const ENV = process.env;

// Rutilus URL (with http:// and without a / at the end)
// Pulled from the file that the user completing the tutorial
// will have appended to by now.
const rutilusAddress = `http://${require('./machineIp')}`;

module.exports = {
  addresses: {
      database: `${ENV.MONGO_PORT.replace('tcp://', 'mongodb://')}/production`,
      analytics: `${rutilusAddress}:3000`,
      logger: rutilusAddress,
  },

  affinityTool: {
      cacheTime: 86400000,
      minHitTimeOnPage: 2000,
  },

  enableAnalytics: ENV.RUTILUS_ENABLE_ANALYTICS || true,
  enableLogger: ENV.RUTILUS_ENABLE_LOGGER || true,

  errorLog: {
    analytics: {
        console: {
            level: 'info',
        },
        file: {
            level: 'info',
            file: '/logs/analyticsApi.log',
        },
    },
    database: '/logs/mongodb.log',
    logger: {
        console: {
            level: 'info',
        },
        file: {
            level: 'info',
            file: '/logs/loggerApi.log',
        },
    }
  },

  ports: {
      logger: 8080,
      analytics: 3000,
  },

  rateLimits: {
    all: {
      windowMs: 60 * 1000, // 1 minute
      delayAfter: 1000, // 300 connections
      delayMs: 0.5 * 1000, // 0.5 seconds
      max: 1000, // 1000 maximum connections
    }
  },

  // * Replace with your config to use this feature
  transporter: {
      service: ENV.RUTILUS_TRANSPORTER_SERVICE || '',
      auth: {
          user: ENV.RUTILUS_TRANSPORTER_EMAIL || '',
          pass: ENV.RUTILUS_TRANSPORTER_PASSWORD || '',
      },
  },

  // * Switch to true in your config to use this feature
  useHttps: ENV.RUTILUS_USE_HTTPS || false,
};
