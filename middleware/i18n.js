/**
 * Created by admin on 06.02.2016.
 */
var i18n = require('i18n-2');

/**
 * Override main path with locales
 * @param app
 * @param config
 * @param routes
 */
module.exports = function(app, config, routes) {

    /**
     * Get prams with locales
     * @param locales
     * @returns {*|Array.<T>|string}
     */
    var getParamRoutes = function(locales) {
        return locales.map(function(val) { return '/' + val; }).concat('/');
    };

    /**
     * Set locale
     */
    app.use(
        getParamRoutes(config.i18n.locales),
        function(req, res, next) {
            var newLocale;
            if (newLocale = req.baseUrl.substring(1)) {
                req.i18n.setLocale(newLocale);
            } else {
                req.i18n.setLocale(req.i18n.defaultLocale);
            }
            next();
        },
        routes
    );
};
