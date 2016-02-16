/**
 * Created by admin on 09.02.2016.
 */
var ABone = require('abone'),
    path = require('path'),
    FormType = require(path.join(__dirname, 'types', 'form'));

/**
 * Create form
 */
module.exports = ABone.create(function() {

    /**
     * Init class
     * @param data
     */
    this.constructor = function(data, formName) {

        // Check argument
        if (data == null) {
            throw new Error('Arguments is not valid');
        }

        // Check argument
        if (formName == null) {
            throw new Error('Form name not passed');
        }

        // Set default type of field
        this.defaultType = 'text';

        // Set data
        this.data = data;
        this.formName = formName;
        this.form = new FormType(this.data, formName);
        this.fields = {};

        // Prepare class
        this.prepare();
    };

    /**
     * Prepare form
     */
    this.prepare = function() {

        // Check if fields is exists
        if (typeof this.data.fields != 'undefined' && this.data.fields != null) {

            // If fields passed as array
            if (Array.isArray(this.data.fields)) {
                var newFieldObject = {};
                for (var key in this.data.fields) {
                    var fieldName = this.data.fields[key];

                    // The key is number but value is field name
                    if (typeof fieldName === 'string') {
                        newFieldObject[fieldName] = {};
                        // Object into array, get his name value name property in this case must be required
                    } else if (
                        typeof fieldName === 'object'
                        && fieldName != null
                        && (
                            typeof fieldName.name === 'string'
                            || !key.match(/\d+/g)
                        )
                    ) {
                        newFieldObject[fieldName.name || key] = fieldName;

                        // If key is number but first inner key is string then this key is field name
                    } else if (key.match(/\d+/g) && typeof this.getObjectFirstKey(fieldName) === 'string') {

                        var firstKey = this.getObjectFirstKey(fieldName),
                            fieldObject = fieldName[firstKey];

                        newFieldObject[fieldObject.name || firstKey] = fieldObject;

                        // Wrong object
                    } else {
                        throw new Error('I don\'t know how to handle such kind of fields, ' +
                            'please use or field item as sting(field name) ' +
                            'or as object which has name property');
                    }
                }

                // Save new prepared object
                this.data.fields = newFieldObject;
            }

            // Iterate all fields and set instances of their type
            for (var fieldName in this.data.fields) {

                // Get field
                var field = this.data.fields[fieldName],

                // Get field type
                    fieldType = field.type || this.defaultType,

                // Get type class
                    Type = require(path.join(__dirname, 'types', fieldType));

                // Save instances
                this.fields[fieldName] = new Type(this, fieldName);
            }
        }
    };

    /**
     * Get internal data
     */
    this.getData = function() {

        // Get form data
        var data = this.form.getData();
        data.fields = {};

        // Iterate fields object and get their data
        for (var fieldKey in this.fields) {
            var field = this.fields[fieldKey],
                fieldData = field.getData();
            data.fields[field.getName()] = fieldData;
        }

        return data;
    };

    /**
     * Get first key of object
     *
     * @param object
     * @returns {string}
     */
    this.getObjectFirstKey = function(object) {

        if (typeof object === 'object') {
            for (var i in object) { return i; }
        } else {
            throw new Error('That is not an object');
        }
    };
});

