/**
 * Created by admin on 06.02.2016.
 */
var express = require('express'),
    app = express(),
    path = require('path'),
    YAML = require('yamljs'),
    routes = require(path.join(__dirname, 'routes/index')),
    shortCut = require(path.join(__dirname, 'lib/short-cuts')),
    config = YAML.load(path.join(__dirname, 'config/app.yml'));

/**
 * Init middleware
 */
shortCut.requireMiddleware('app-init')(app, config, __dirname);
shortCut.requireMiddleware('security')(app);
shortCut.requireMiddleware('i18n')(app, config, routes);

module.exports = app;
