const readFromFile = require('./readFromFile');
const getEnvVariable = require('./getEnvVariable');

/**
 * @param {Object|String} c
 */
module.exports = function(c) {

    if (typeof c !== 'object') {
        return c;
    }

    const { type, source } = c;

    switch(type) {

        case 'file':
            return readFromFile('keys', source);
            break;

        case 'env':
            return getEnvVariable(source);
            break;
        case 'string':

        default:
            return source;
            break;

    }

};