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

    /**
     * Init type
     */
    this.init = function() {

        /** Fields which have to be parsed */
        this.reservedAttributes = ['attr', 'label', 'type']; // Attr must iterate before all the rest

        /** Name of current type */
        this.classType = 'button';

        /** This type will be used by default in input type attribute if type not passed to attr.type */
        this.defaultInputType = 'submit';

        // Convert data
        this.convert();
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
        this.result.attr.type = this.result.attr.type || this.defaultInputType;
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

