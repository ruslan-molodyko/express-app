/**
 * Created by admin on 11.02.2016.
 */
var ABone = require('abone'),
    path = require('path'),
    Form = require(path.join(__dirname, '..', 'form.js'));

/**
 * Parent form for fieds type
 */
module.exports = ABone.create(function() {

    /**
     * Init class
     * @param form Form in converted form
     */
    this.constructor = function(form, fieldName) {

        // Check form data
        if (form == null) {
            throw new Error('Form data is not valid');
        }

        // Check field name
        if (fieldName == null) {
            throw new Error('Field name not passed');
        }

        // Check if it the form instance
        if (!(form instanceof Form)) {
            throw new Error('Form is wrong');
        }

        // Form name
        this.form = form;
        this.formName = form.formName;
        this.fieldName = fieldName;
        this.result = {};

        /**
         * Init form
         */
        this.init();
    };

    /**
     * Prepare data
     */
    this.convert = function() {

        // Iterate all reserved attributes
        this.reservedAttributes.forEach(function(val) {
            var fieldName = val,
                methodName = '_' + fieldName;

            // Check if valid value
            if (typeof val !== 'string') {
                throw new Error('Reserved attribute is not a string');
            }

            // Handle field or throw exception
            if (typeof this[methodName] === 'function') {
                this[methodName](this.form.data.field[this.fieldName][fieldName], fieldName);
            } else {
                throw new Error('Handler of type for reserved attribute [' + fieldName + '] not defined');
            }

        }.bind(this));

        return this;
    };

    /**
     * Get result data from form field
     * @returns {*}
     */
    this.getData = function() {
        return this.result;
    };

    /**
     * Get field name
     * @returns {*}
     */
    this.getName = function() {
        return this.fieldName;
    }
});
