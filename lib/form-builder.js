/**
 * Created by admin on 06.02.2016.
 */
var Form = require('form-builder').Form;

module.exports = function(config, data) {

    var form = Form.create(config.attr, data),
        resultForm = {};

    /**
     * Open form
     * @returns {*}
     */
    resultForm.open = function() {
        return form.open();
    };

    /**
     * Close form
     * @returns {*}
     */
    resultForm.end = function() {
        return form.end();
    };

    resultForm.widget = function(name) {
        if (typeof config.fields[name] !== 'undefined') {
            return form[config.fields[name].type]().attr('name', name).render();
        }
    };

    return resultForm;
};
