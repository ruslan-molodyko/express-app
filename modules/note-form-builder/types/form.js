/**
 * Created by admin on 11.02.2016.
 */
var ABone = require('abone');

/**
 * Create form
 */
module.exports = ABone.create(function () {

    'use strict';

    /**
     * Init class
     * @param form
     * @param formName
     */
    this.constructor = function (form, formName) {

        // Check form data
        if (form == null) {
            throw new Error('Form data is not valid');
        }

        // Check form name
        if (formName == null) {
            throw new Error('Form name not passed');
        }

        /** Fields which have to be parsed */
        this.reservedAttributes = ['name', 'attr', 'fieldNameAsArray', 'field'];
        this.form = form;
        this.formName = formName;
        this.result = {};

        // Convert data from form to internal
        this.convert();
    };

    /**
     * Get internal data
     * @returns {*}
     */
    this.getData = function () {
        return this.result;
    };

    /**
     * Prepare data
     */
    this.convert = function () {

        this.reservedAttributes.forEach(function (val) {
            var fieldName = val,
                methodName = '_' + fieldName;

            // Check if valid value
            if (typeof val !== 'string') {
                throw new Error('Reserved attribute is not a string');
            }

            // Handle field or throw exception
            if (typeof this[methodName] === 'function') {
                this[methodName](this.form[fieldName], fieldName);
            } else {
                throw new Error('Handler for field [' + fieldName + '] not defined');
            }

        }.bind(this));

        return this;
    };

    /**
     * Handle name field
     * @param field
     */
    this._name = function (field) {

        // Set default value
        if (field === undefined) {
            this.result.name = this.formName;
        } else {
            this.result.name = field;
        }
    };

    /**
     * Handle attr field
     * @param field
     */
    this._attr = function (field) {

        // Set default value
        if (field === undefined) {
            this.result.attr = {};
        } else {
            this.result.attr = field;
        }
    };

    /**
     * Handle fields field
     * @param field
     */
    this._field = function (field) {

        // Set default value
        if (field === undefined) {
            this.result.field = {};
        } else {
            this.result.field = field;
        }
    };

    /**
     * Handle fieldNameAsArray field
     * @param field
     */
    this._fieldNameAsArray = function (field) {

        // Set default value
        if (field === undefined) {
            this.result.fieldNameAsArray = false;
        } else {
            this.result.fieldNameAsArray = field;
        }
    };
});
