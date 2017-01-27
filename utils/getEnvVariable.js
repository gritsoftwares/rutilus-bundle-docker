const env = (process && process.env) || {};

module.exports = function (v) {
    return env[v];
};