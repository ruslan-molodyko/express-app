/**
 * Created by admin on 15.02.2016.
 */
"use strict";

var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    concat = require('gulp-concat'),
    node,
    app = {
        endpoint: path.join(__dirname, 'app.js'),
        pathToApp: path.join(__dirname, 'app'),
        sourcePublicScript: path.join(__dirname, 'app/**/public/**/*.js'),
        targetPublicDirectory: path.join(__dirname, 'public/app'),
        typeSources: ['controller', 'unit'],
        clientDirectory: 'public',
        compiledFileName: 'index.js'
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
    var modules = fs.readdirSync(app.pathToApp), pathToModule, pathToType, targetPath, srcPath;

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
                    .pipe(concat(app.compiledFileName))
                    .pipe(gulp.dest(targetPath));
            });
        });
    });
});

/**
 * Watch all javascript files
 */
gulp.task('watch', ['concat-js', 'restart-server'], function () {
    gulp.watch(app.targetPublicDirectory, ['concat-js']);
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
