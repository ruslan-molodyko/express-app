/**
 * Created by admin on 11.02.2016.
 */
var ABone = require('abone'),
    path = require('path'),
    Fields = require(path.join(__dirname, 'fields'));

/**
 * Create form
 */
module.exports = ABone.create(function () {

    'use strict';

    /**
     * Init type
     */
    this.init = function () {

        /** Fields which have to be parsed */
        this.reservedAttributes = ['attr', 'label', 'name', 'options']; // Attr must iterate before all the rest

        /** Name of current type */
        this.classType = 'select';

        // Convert data
        this.convert();
    };

    /**
     * Set value of field
     *
     * @param value Value of field
     */
    this.setValue = function (value) {

        this.value = value;
    };

    /**
     * Handle field
     * @param field
     */
    this._options = function (field) {

        // Check and set default value
        if (field === undefined) {
            this.result.options = [];
        } else {
            this.result.options = this.formatOptions(field);
        }
    };

    /**
     * Parse options item and save in the right form
     * @param field
     */
    this.formatOptions = function (field) {

        var result = [], key, option, object;

        for (key in field) {
            option = field[key];
            object = {};

            // If its simple key value object or array
            if (typeof option === 'string') {

                // If its array then it have such format ['key1', 'key2', ...]
                if (Array.isArray(field)) {
                    object.name = option;
                    object.value = option;

                    // If its array then it have such format {'value': 'name', ...}
                } else if (typeof field === 'object') {
                    object.name = option;
                    object.value = key;
                } else {
                    throw new Error('Simple select type can not be recognized');
                }

                // Its complex object with name and value keys
            } else if (typeof option === 'object') {

                // Check if values is valid
                if (typeof option === 'object' &&
                    (typeof option.name === 'string' && option.name.length > 0) &&
                    (typeof option.value === 'string' && option.value.length > 0)
                ) {
                    object.name = option.name;
                    object.value = option.value;
                } else {
                    throw new Error('Wrong complex select type format');
                }
            } else {
                throw new Error('Wrong type of options');
            }

            // Save item of options
            result.push(object);
        }

        return result;
    };

    /**
     * Handle field
     * @param field
     */
    this._name = function (field) {

        // Check and set default value
        if (field === undefined) {
            this.result.name = this.fieldName;
        } else {
            this.result.name = field;
        }

        // Set name as attribute of html tag
        this.result.attr.name = this.result.attr.name || this.result.name;

        // Wrap name as array by form name
        if (this.form.data.fieldNameAsArray === true) {
            this.result.attr.name = this.formName + '[' + this.result.attr.name + ']';
        }
    };

    /**
     * Handle field
     * @param field
     */
    this._attr = function (field) {

        // Check and set default value
        if (field === undefined) {
            this.result.attr = {};
        } else {
            this.result.attr = field;
        }
    };

    /**
     * Handle field
     * @param field
     */
    this._label = function (field) {

        // Check and set default value
        if (field === undefined) {
            this.result.label = this.fieldName;
        } else {
            this.result.label = field;
        }
    };

}, Fields);
