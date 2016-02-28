/**
 * Created by admin on 27.03.2016.
 */
var path = require('path');

/**
 * Manage the login and logout logic
 * @param app
 */
module.exports = function(app) {

    'use strict';


    /**
     * Handle login
     */
    app.all('/main1', function (req, res) {
        res.render('server/main', {title: 'Main title'});
    });
};
