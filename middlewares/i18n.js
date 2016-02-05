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

    i18n.expressBind(app, config.i18n);

    var getParamRoutes = function(locales) {
        return locales.map(function(val) { return '/' + val; }).concat('/');
    };

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

