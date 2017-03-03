const config = require('./config/config');

if (config.enableAnalytics) {
    const AnalyticsApi = require('rutilus-analytics-node-js');
    AnalyticsApi(config);
}
