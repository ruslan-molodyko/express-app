/**
 * Created by admin on 06.02.2016.
 */

var path = require('path'),
    jade = require('jade'),
    fs = require('fs'),
    Form = require(path.join(__dirname, 'form.js'));

module.exports = {

    /**
     * Save link to form
     */
    Form: Form,

    /**
     * Init form builder
     * @param app
     */
    init: function(app) {}
};
