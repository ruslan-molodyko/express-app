/**
 * Created by admin on 15.02.2016.
 */
"use strict";

var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    BootstrapGenerator = require(path.join(__dirname, 'lib', 'generator', 'client-bootstrap')),
    exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    concat = require('gulp-concat'),
    node,
    app = {
        endpoint: 'bin/www',
        pathToApp: path.join(__dirname, 'app'),
        sourcePublicScript: path.join(__dirname, 'app/**/public/**/*.js'),
        targetPublicDirectory: path.join(__dirname, 'public/app'),
        typeSources: ['controller', 'unit'],
        clientDirectory: 'public',
        compiledFileName: 'index.js',
        bootstrapFileName: 'bootstrap.js',
        configFileName: 'config.yaml',
        configKey: 'client-bootstrap',

        /**
         * Get code of client bootstrap file
         *
         * @param moduleName
         * @param pathToModule
         * @returns {string}
         */
        generateBootstrap: function (moduleName, pathToModule) {
            var fileConfig = BootstrapGenerator.getConfigFromYmlFile(path.join(pathToModule, app.configFileName)),
                config,
                generator;

            // Check if config is exists
            if (typeof fileConfig === 'object' && fileConfig[app.configKey] != null) {
                config = fileConfig[app.configKey];
            }

            // Extend config
            config = Object.assign({
                moduleTypes: app.typeSources,
                moduleName: moduleName
            }, config);

            // Create generator
            generator = new BootstrapGenerator(config);

            // Get code
            return generator.getRequireJsCode();
        }
    };

/**
 * Restart server
 */
gulp.task('restart-server', function () {
    if (node) {
        node.kill();
    }
    node = spawn('node', [app.endpoint], {stdio: 'inherit'});
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

/**
 * Iterate all modules in app.
 * Move all javascript which should be use for client
 */
gulp.task('concat-js', function () {

    // Get all modules name
    var modules = fs.readdirSync(app.pathToApp), pathToModule, pathToType, targetPath, srcPath, generator, config;

    // Iterate module names
    modules.forEach(function (moduleName) {
        pathToModule = path.join(app.pathToApp, moduleName);

        // Iterate types i.e controller, unit ...
        app.typeSources.forEach(function (type) {
            pathToType = path.join(pathToModule, type);

            // Iterate target directory
            fs.readdirSync(pathToType).forEach(function (targetName) {
                targetPath = path.join(app.targetPublicDirectory, moduleName, type, targetName);
                srcPath = path.join(pathToType, targetName, app.clientDirectory, '/**/*.js');

                // Concat all javascript into one file and move it to public directory
                gulp.src(srcPath)
                    //.pipe(concat(app.compiledFileName))
                    .pipe(gulp.dest(targetPath));
            });

            // Save bootstrap file
            fs.writeFile(
                path.join(app.targetPublicDirectory, moduleName, app.bootstrapFileName),
                app.generateBootstrap(moduleName, pathToModule)
            );
        });
    });
});

/**
 * Watch all javascript files
 */
gulp.task('watch', ['concat-js', 'restart-server'], function () {
    gulp.watch(app.pathToApp + '/**/*.js', ['concat-js']);
});

/**
 * Start work
 */
gulp.task('default', ['watch']);

// clean up if an error goes unhandled.
process.on('exit', function () {
    if (node) {
        node.kill();
    }
});
