
var i18n = require('i18n-2');

/**
 * Override main path with locales
 * @param app
 * @param locales
 * @param defLocale
 * @param routes
 */
module.exports = {
    init: function(app, options) {
        i18n.expressBind(app, options);
    },
    paths: function(locales) {
        return locales.map(function(val) { return '/' + val; }).concat('/')
    },
    fn: function(req, res, next) {
        var newLocale;
        if (newLocale = req.baseUrl.substring(1)) {
            req.i18n.setLocale(newLocale);
        } else {
            req.i18n.setLocale(req.i18n.defaultLocale);
        }
        next();
    }
};

