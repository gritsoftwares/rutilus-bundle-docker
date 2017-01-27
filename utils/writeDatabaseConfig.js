const readTypeSourceObject = require('./readTypeSourceObject');

/**
 * @param {{
 *   host: TypeSourceObject,
 *   authentication: {
 *     username: TypeSourceObject,
 *     password: TypeSourceObject,
 *     mechanism: TypeSourceObject,
 *     source: TypeSourceObject
 *   }
 * }} source
 * @param {Object} target
 */
module.exports = function(source, target) {

    target.host = readTypeSourceObject(source.host);

    let fullAddress = target.host + '';
    fullAddress = fullAddress.replace('tcp', 'mongodb');

    if (source.authentication) {
        target.username  = readTypeSourceObject(source.authentication.username);
        target.password  = readTypeSourceObject(source.authentication.password);
        target.mechanism = readTypeSourceObject(source.authentication.mechanism);
        target.source    = readTypeSourceObject(source.authentication.source);

        fullAddress = fullAddress.replace('://', `://${target.username}:${target.password}@`);

        fullAddress += '/?authMechanism=DEFAULT&authSource=admin';
    }

    target.fullAddress = fullAddress;

};
