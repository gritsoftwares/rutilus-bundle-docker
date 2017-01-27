const fs = require('fs');

module.exports = function (directory, v) {
    return fs.readFileSync(`./config/${directory}/${v}`).toString();
};