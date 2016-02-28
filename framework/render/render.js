/**
 * Created by admin on 28.02.2016.
 */
"use strict";

var ABone = require('abone'),
    path = require('path');

/**
 * Render view with locals
 */
var Render = ABone.create(function () {

    /**
     * Init data
     *
     * @param {viewPath} viewPath
     */
    this.constructor = function (viewPath) {
        this.viewPath = viewPath;
    };

    /**
     * Render view
     */
    this.render = function (res, view, data) {
        res.render(path.join(this.viewPath, view), data, function (foo, html) {
            res.send(html);
        });
    };
});

module.exports = function (viewPath) {
    return new Render(viewPath);
};


