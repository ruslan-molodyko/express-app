/**
 * Created by admin on 06.02.2016.
 */
var express = require('express'),
    app = express(),
    path = require('path'),
    YAML = require('yamljs'),
    routes = require(path.join(__dirname, 'routes/security')),
    sc = require(path.join(__dirname, 'lib/short-cuts')),
    config = YAML.load(path.join(__dirname, 'config/app.yml'));

/**
 * Init middleware
 */
sc.requireMiddleware('app-init')(app, config, __dirname);
sc.requireMiddleware('security')(app);
sc.requireMiddleware('i18n')(app, config, routes);
sc.requireMiddleware('e404')(app);

module.exports = app;

