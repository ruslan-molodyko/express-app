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
        this.reservedAttributes = ['attr', 'label', 'name', 'type']; // Attr must iterate before all the rest

        /** Name of current type */
        this.classType = 'text';

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
        this.result.value = value;

        // Set value to attributes of input
        this.result.attr.value = value;
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
        if (this.form.config.fieldNameAsArray === true) {
            this.result.attr.name = this.formName + '[' + this.result.attr.name + ']';
        }
    };

    /**
     * Handle field
     * @param field
     */
    this._type = function (field) {

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
    this._attr = function (field) {

        // Check and set default value
        if (field === undefined) {
            this.result.attr = {
                id: this.tagId
            };
        } else {
            this.result.attr = field;

            // Set id to attr array
            if (field.id === undefined) {
                this.result.attr.id = this.tagId;
            }
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
