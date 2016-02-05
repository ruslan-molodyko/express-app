/**
 * Created by admin on 06.02.2016.
 */

var path = require('path');

module.exports = {
    /**
     * Require module from middleware directory
     * @param name
     * @returns {*|Object}
     */
    requireMiddleware: function(name) {
        return require(path.join(__dirname, '..' , 'middleware', name));
    }
};
