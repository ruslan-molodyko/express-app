/**
 * Created by admin on 06.02.2016.
 */

var ABone = require('abone')
    ;

/**
 * Create form
 */
var Form = ABone.create(function() {

    /**
     * Init class
     * @param form
     */
    this.constructor = function(form) {

        // Check argument
        if (form == null) {
            throw new Error('Arguments is not valid');
        }

        this.form = form;

        // Properties which is not attribute of form html element
        this.formProperties = ['name'];

        // Properties which is not attribute of field html element
        this.fieldProperties = ['label'];

        this.defaultData = {
            _form_: {
                attr: {
                    action: '/',
                    method: 'POST',
                    class: '.form-builder-'
                }
            },
            field: {
                attr: {
                    type: 'text'
                }
            }
        };

        // Convert arguments to right for of data object
        this.data = this.convert();

        // Init default values of form
        this.initDefault();
    };

    /**
     * Init default values of form and form fields
     */
    this.initDefault = function() {

        // Iterate all keys of data object
        for (var key in this.data) {
            var value = this.data[key];

            // Set form data
            if (key == '_form_') {

                if (typeof value.attr['action'] === 'undefined') {
                    value.attr['action'] = this.defaultData._form_.attr.action;
                }
                if (typeof value.attr['method'] === 'undefined') {
                    value.attr['method'] = this.defaultData._form_.attr.method;
                }
                if (typeof value.attr['class'] === 'undefined') {
                    value.attr['class'] = this.defaultData._form_.attr.class + this.data._form_['name'];
                }

                // Set fields data
            } else {
                if (typeof value.attr['type'] === 'undefined') {
                    value.attr['type'] = this.defaultData.field.attr.type;
                }
                if (typeof value['name'] === 'undefined') {
                    value.attr['name'] = key;
                }
                if (typeof value['label'] === 'undefined') {
                    value['label'] = key;
                }
            }
        }
    };

    /**
     * Convert config to native data
     */
    this.convert = function() {

        // Create frame
        var form = {
            _form_: {
                attr: {}
            }
        };

        // Iterate all keys of form and get properties for form
        for (var key in this.form) {
            var value = this.form[key];

            // Skip properties for fields
            if (key == 'fields') {

                // Iterate all fields
                for (var fieldKey in this.form.fields) {
                    var fieldValue = this.form.fields[fieldKey];

                    // Create field if not exists
                    if (form[fieldKey] == null) {
                        form[fieldKey] = {
                            attr: {}
                        };
                    }

                    // Iterate all attributes of field
                    for (var fieldAttrKey in fieldValue) {
                        var fieldAttrValue = fieldValue[fieldAttrKey];

                        // Set attribute as field attribute or as html input
                        if (this.fieldProperties.indexOf(fieldAttrKey) !== -1) {
                            form[fieldKey][fieldAttrKey] = fieldAttrValue;
                        } else {

                            // If there is attr object then merge previous attributes with them
                            if (key == 'attr') {

                                form[fieldKey].attr = Object.assign(form[fieldKey].attr, fieldAttrValue);
                            } else {

                                form[fieldKey].attr[fieldAttrKey] = fieldAttrValue;
                            }
                        }
                    }
                }

                // Go to next field
                continue;
            }

            // If there is key which is not attribute of html form element then save it to form
            if (this.formProperties.indexOf(key) !== -1) {

                form._form_[key] = value;

                // Or save it to attributes array
            } else {
                // If there is attr object then merge previous attributes with them
                if (key == 'attr') {

                    form._form_.attr = Object.assign(form._form_.attr, value);
                } else {

                    form._form_.attr[key] = value;
                }
            }
        }

        // Save to native data
        return form;
    };

    /**
     * Get data from form
     * @returns {*}
     */
    this.getForm = function() {

        return this.data;
    }
});

module.exports = Form;