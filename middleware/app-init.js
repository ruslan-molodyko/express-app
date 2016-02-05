/**
 * Created by admin on 06.02.2016.
 */
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    passport = require('passport'),
    i18n = require('i18n-2'),
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

    // Init i18n
    i18n.expressBind(app, config.i18n);

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

};
