/**
 * Created by admin on 09.02.2016.
 */
var ABone = require('abone'),
    path = require('path'),
    FormType = require(path.join(__dirname, 'types', 'form'));

/**
 * Create form
 */
module.exports = ABone.create(function () {

    'use strict';

    /**
     * Init class
     * @param {Object} config Schema of form
     * @param {String} formName Form name
     * @param {Object} data Form data
     */
    this.constructor = function (config, formName, data) {

        // Check argument
        if (config == null) {
            throw new Error('Arguments is not valid');
        }

        // Check argument
        if (formName == null) {
            throw new Error('Form name not passed');
        }

        // Set default type of field
        this.defaultType = 'text';

        // Set data
        this.fieldValues = data;
        this.config = config;
        this.formName = formName;
        this.form = new FormType(this.config, formName);
        this.field = {};

        // Prepare class
        this.prepare();
    };

    /**
     * Prepare form
     */
    this.prepare = function () {

        var newFieldObject = {}, key, fieldName, firstKey, fieldObject, field, fieldType, Type;

        // Check if fields is exists
        if (this.config.field !== undefined && this.config.field != null) {

            // If fields passed as array
            if (Array.isArray(this.config.field)) {
                for (key in this.config.field) {
                    fieldName = this.config.field[key];

                    // The key is number but value is field name
                    if (typeof fieldName === 'string') {
                        this._addFieldToLocalObject(newFieldObject, fieldName, {});

                        // Object into array, get his name value name property in this case must be required
                    } else if (
                        typeof fieldName === 'object' &&
                        Array.isArray(this.config.field) &&
                        typeof fieldName.name === 'string' &&
                        fieldName.name.length > 0
                    ) {
                        this._addFieldToLocalObject(newFieldObject, fieldName.name, fieldName);

                        // If key is number but first inner key is string then this key is field name
                    } else if (typeof this.getObjectFirstKey(fieldName) === 'string') {

                        firstKey = this.getObjectFirstKey(fieldName);
                        fieldObject = fieldName[firstKey];

                        this._addFieldToLocalObject(newFieldObject, firstKey, fieldObject);

                        // Wrong object
                    } else {
                        throw new Error('I don\'t know how to handle such kind of fields, ' +
                            'please use or field item as sting(field name) ' +
                            'or as object which has name property');
                    }
                }

                // Save new prepared object
                this.config.field = newFieldObject;
            }

            // Iterate all fields and set instances of their type
            for (key in this.config.field) {

                // Get field
                field = this.config.field[key];

                // Get field type
                fieldType = field.type || this.defaultType;

                // Get type class
                Type = require(path.join(__dirname, 'types', fieldType + '.js'));

                // Save instances
                this.field[key] = new Type(this, key);

                // Set value to field if exists
                if (typeof this.fieldValues === 'object' && this.fieldValues[key] !== undefined) {
                    this.field[key].setValue(this.fieldValues[key]);
                }
            }
        }
    };

    /**
     * Check if fields not the same names
     *
     * @param object
     * @param name
     * @param value
     * @private
     */
    this._addFieldToLocalObject = function (object, name, value) {
        if (typeof object === 'object' && object[name] === undefined) {
            object[name] = value;
        } else {
            throw new Error('Such field name [' + name + '] already used');
        }
    };

    /**
     * Get internal data
     */
    this.getForm = function () {

        // Get form data
        var data = this.form.getData(), fieldKey, field, fieldData;
        data.field = {};

        // Iterate fields object and get their data
        for (fieldKey in this.field) {
            field = this.field[fieldKey];
            fieldData = field.getData();
            data.field[field.getName()] = fieldData;
        }

        return data;
    };

    /**
     * Get first key of object
     *
     * @param object
     * @returns {string}
     */
    this.getObjectFirstKey = function (object) {

        var keys = Object.keys(object);

        if (typeof object === 'object' && keys[0] !== undefined) {
            return keys[0];
        }
        throw new Error('That is not an object');
    };
});

