/**
 * Created by admin on 27.03.2016.
 */
var path = require('path'),
    baseDir = process.cwd(),
    render = require(path.join(baseDir, 'framework', 'render', 'render'))(path.join(baseDir, 'views', 'server'));

/**
 * Manage the login and logout logic
 * @param app
 */
module.exports = function (app) {
    'use strict';

    /**
     * Handle login
     */
    app.all('/main1', function (req, res) {
        render.render(res, 'main.jade', {title: 'Main title'});
    });
};
