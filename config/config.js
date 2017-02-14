const ENV = process.env;

module.exports = {
    useHttps: ENV.RUTILUS_USE_HTTPS || false,

    ports: {
        logger: ENV.RUTILUS_LOGGER_PORT || 8080,
        analytics: ENV.RUTILUS_ANALYTICS_PORT || 3000
    },

    addresses: {
        database: (
            ENV.MONGOCONTAINER_PORT &&
            ENV.MONGOCONTAINER_PORT
                .replace('tcp', 'mongodb')
                .replace('://', '://oslo:EngWulDb_esD@') +
                '/production?authenticationMechanism=DEFAULT&authSource=admin'
        ) || 'mongodb://localhost:27017',
        analytics: ENV.RUTILUS_ANALYTICS_ADDRESS || 'http://localhost:3000',
    },

    // optional (depends on useHttps)
    httpsKeys: {
        key: ENV.RUTILUS_HTTPS_KEY || '',
        cert: ENV.RUTILUS_HTTPS_CERT || '',
        ca: ENV.RUTILUS_HTTPS_CA || ''
    },


    heartbeatAddresses: [
        {
            title: 'Logger API',
            address: 'https://eceps.engineering.com',
            useHttps: true,
            logDirectory: '/logs',
            logFile: 'logger.log',
            timeSpan: 10000,
            maxFileSizeBytes: 1000000,
            crashWhenFail: true,
        }, {
            title: 'Analytics API',
            address: 'https://eceps.engineering.com:3000/ping',
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

    extraInformation: [
        {
            label: 'First name',
            fieldName: 'firstName',
            type: 'String',
            target: 'users',
            inAffinityUser: true,
            inAffinityPersona: false,
            inAffinityProfile: false,
        },
        {
            label: 'Last name',
            fieldName: 'lastName',
            type: 'String',
            target: 'users',
            inAffinityUser: true,
            inAffinityPersona: false,
            inAffinityProfile: false,

        },
        {
            label: 'Email',
            fieldName: 'email',
            type: 'String',
            target: 'users',
            inAffinityUser: true,
            inAffinityPersona: false,
            inAffinityProfile: false,

        },
        {
            label: 'Job',
            fieldName: 'job',
            type: 'String',
            target: 'users',
            inAffinityUser: true,
            inAffinityPersona: true,
            inAffinityProfile: true,

        }
    ],

    // optional
    // objects that provide settings for rate limiting
    rateLimits: {
        // Use logger: and/or analytics: to specify rate
        // limiters for each or all: for every module
        all: (ENV.RUTILUS_RATE_LIMIT)
            ? JSON.parse(ENV.RUTILUS_RATE_LIMIT)
            : {
                  windowMs: 1000,
                  delayAfter: 1000,
                  delayMs: 1000,
                  max: 1000
              }
    },

    affinityTool: {
        cacheTime: ENV.RUTILUS_CACHE_TIME || 9001,
        minHitTimeOnPage: ENV.RUTILUS_MIN_HIT_TIME || 2000
    },

    transporter: {
        service: 'gmail',
        auth: {
            user: 'henriquesc@gmail.com',
            pass: '{tNS}138gOE'
        }
    },

};

/*
extraInformation

label: the display name of the field
fieldName: name of the field in the database
type: type of the field (read below)
target: target collection for the field


Optional field:
- weight
 0 (or undefined) - Light
 1 - Medium
 2 - Heavy


accepted types:

- Number
- Boolean
- ObjectArray
- Date
- Object
- String

Changes in the logger api to add one:
- utils/parsing.js fromExtra() - Add a new case

Changes in the analytics api to add one:
- utils/parsing.js getMongooseType() - Add a new case
- schema/misc/filter.js - Add a new case in the function
- schema/misc/join.js - Add a new case in the function

Important: if the target is 'users', we have optional fields:
- inAffinityUser
- inAffinityPersona
- inAffinityProfile
If set to true, it will be used by the affinity tool to make the 'user', 'persona', and 'profile'
 */