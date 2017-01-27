module.exports = {
    useHTTPS: true,

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
        }
    },

    extraInformation: {

        logger: [
            {
                fieldName: 'firstName',
                type: 'String',
                target: 'users'
            },
            {
                fieldName: 'lastName',
                type: 'String',
                target: 'users'
            },
            {
                fieldName: 'email',
                type: 'String',
                target: 'users'
            },
            {
                fieldName: 'job',
                type: 'String',
                target: 'users'
            }
        ]

    },

};