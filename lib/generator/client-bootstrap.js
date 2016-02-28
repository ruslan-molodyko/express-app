/**
 * Created by admin on 28.02.2016.
 */

var ABone = require('abone'),
    YAML = require('yamljs'),
    path = require('path');

module.exports = ABone.create(function () {
    "use strict";

    /**
     * Init data
     * @param option
     */
    this.constructor = function (option) {

        if (typeof option !== 'object') {
            throw new Error('Option is wrong');
        }
        if (typeof option.moduleName !== 'string') {
            throw new Error('Module name is wrong');
        }

        this.moduleName = option.moduleName;
        this.baseUrl = option.baseUrl || '/';
        this.appDirectoryName = option.appDirectoryName || 'app';
        this.runModule = option.runModule;
        this.requiredModules = option.requiredModules || [];
        this.moduleTypes = option.moduleTypes || [];

        this.typePrefix = '__';
        this.moduleAlias = 'module';
        this.indent = 2;
    };

    /**
     * Get javascript object from yaml file
     *
     * @param path
     */
    this.constructor.getConfigFromYmlFile = function (path) {
        return YAML.load(path);
    };

    /**
     * Get require js config
     *
     * @returns {object}
     */
    this.generateRequireJsConfig = function () {
        var config = {
            baseUrl: this.baseUrl,
            paths: {}
        }, module;

        // Add module alias
        config.paths[this.typePrefix + this.moduleAlias] = path.join(this.appDirectoryName, this.moduleName);

        // Add types alias
        this.moduleTypes.forEach(function (type) {
            config.paths['__' + type] = path.join(this.appDirectoryName, this.moduleName, type);
        }.bind(this));

        // Add required module alias
        for (module in this.requiredModules) {
            config.paths[module] = this.requiredModules[module];
        }

        return config;
    };

    /**
     * Get require js config
     *
     * @returns {string}
     */
    this.getRequireJsConfigCode = function () {
        return 'requirejs.config(' + JSON.stringify(this.generateRequireJsConfig(), null, this.indent) + ')';
    };

    /**
     * Get code for run module after loading
     *
     * @returns {*}
     */
    this.getRequireJsRunModuleCode = function () {
        if (typeof this.runModule === 'string') {
            return 'require(["' + this.runModule + '"])';
        }
        return '';
    };

    /**
     * Get result code
     *
     * @returns {string}
     */
    this.getRequireJsCode = function () {
        return ';' + this.getRequireJsConfigCode() + ';\n;' + this.getRequireJsRunModuleCode() + ';';
    };
});
