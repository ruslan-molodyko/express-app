/**
 * Created by admin on 11.02.2016.
 */
var ABone = require('abone'),
    path = require('path'),
    Fields = require(path.join(__dirname, 'fields'));

/**
 * Create form
 */
module.exports = ABone.create(function() {

    //this.constructor = function() {
    //    this.parentClass.constructor.apply(this, arguments);
    //};

    /**
     * Init type
     */
    this.init = function() {

        /** Fields which have to be parsed */
        this.reservedAttributes = ['attr', 'label', 'name', 'type']; // Attr must iterate before all the rest

        /** Name of current type */
        this.classType = 'text';

        // Convert data
        this.convert();
    };

    /**
     * Handle field
     * @param field
     */
    this._name = function(field) {

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
    this._type = function(field) {

        // Check and set default value
        if (field === undefined) {
            this.result.type = this.classType;
        } else {
            this.result.type = field;
        }

        // Set type as attribute of html tag
        this.result.attr.type = this.result.attr.type || this.result.type;
    };

    /**
     * Handle field
     * @param field
     */
    this._attr = function(field) {

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
    this._label = function(field) {

        // Check and set default value
        if (field === undefined) {
            this.result.label = this.fieldName;
        } else {
            this.result.label = field;
        }
    };

}, Fields);
