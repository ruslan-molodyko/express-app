/**
 * Created by admin on 06.02.2016.
 */
var path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    passport = require('passport'),
    session = require('express-session');

/**
 * Main initialization of app
 * @param app
 * @param config Main config
 * @param baseDir
 */
module.exports = function(app, config, baseDir) {

    // Init mongoose connection
    mongoose.connect(config.db.connection);

    // View engine setup
    app.set('views', path.join(baseDir, 'views'));
    app.set('view engine', config.app.viewEngine);

    // Additional setup
    app.use(favicon(path.join(baseDir , 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(baseDir ,'public')));

    // Session and passport setup
    app.use(session({cookie: {maxAge: 60000}, secret: config.app.secretKey}));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    /**
     * Catch 404 and forward to error handler
     */
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // Error handlers

    /**
     * Development error handler will print stacktrace
     */
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    /**
     * Production error handler no stacktraces leaked to user
     */
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
