const readFromFile = require('./readFromFile');
const getEnvVariable = require('./getEnvVariable');

/**
 * @param {String} type
 * @param {String} source
 */
module.exports = function({ type, source }) {

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
