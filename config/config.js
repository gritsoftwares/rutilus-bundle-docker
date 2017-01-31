module.exports = {
    useHTTPS: false,

    addresses: {
        analytics: 'http://www.api2.com:3000/',
    },

    heartbeatAddresses: [
        {
            title: 'My API 1',
            address: 'https://www.api1.com/',
            useHttps: true,
            logDirectory: '/logs',
            logFile: 'api1.log',
            timeSpan: 10000,
            maxFileSizeBytes: 1000000,
            crashWhenFail: true,
        }, {
            title: 'My API 2',
            address: 'http://www.api2.com:3000/',
            useHttps: false,
            logDirectory: '/logs/api2',
            logFile: 'api2.log',
            timeSpan: 60000,
        }
    ],

    https: {
        key: {
            type: 'file',
            source: 'key.key'
        },

        cert: {
            type: 'file',
            source: 'cert.crt'
        },

        ca: {
            type: 'file',
            source: 'ca.crt'
        }
    },

    database: {
        host: {
            type: 'env',
            source: 'DATABASE_ADDRESS'
        },
        authentication: {
            username: {
                type: 'string',
                source: 'username'
            },
            password: {
                type: 'string',
                source: 'password'
            },
            mechanism: {
                type: 'string',
                source: 'DEFAULT'
            },
            source: {
                type: 'string',
                source: 'admin'
            }
        }
    },

    logFiles: {
        loggerApi: {
            type: 'string',
            source: 'loggerApi.log'
        },
        analyticsApi: {
            type: 'string',
            source: 'analyticsApi.log'
        }
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

    rateLimit: {
        logger: {
            windowMs: 60 * 1000, // 1 minute
            delayAfter: 1000, // 300 connections
            delayMs: 0.5 * 1000, // 0.5 seconds
            max: 1000, // 1000 maximum connections
        },
        analytics: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 2000, // Limit each IP to 1000 requests per windowMs
        }
    },

    affinityTool: {
        cacheTime: 1,
        minHitTimeOnPage: 40
    },

    dashboard: {
        userAccounts: [{
            username: 'admin',
            password: '$2a$10$cSJHqttdnVCEDXZEafyMKuSj.Ps9KgJvkKHUFkTzHfxZgfCPDlwVK' // Password123!
        }]
    }

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