/**
 * Created by admin on 06.02.2016.
 */

var path = require('path');

module.exports = {
    requireMiddleware: function(name) {
        return require(path.join(__dirname, '..' , 'middlewares', name));
    }
};
