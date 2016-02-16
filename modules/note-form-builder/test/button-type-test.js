/**
 * Created by admin on 11.02.2016.
 */
require("blanket")({ pattern: function (filename) {
    return !/node_modules/.test(filename);
} });
var path = require('path'),
    Form = require(path.join(__dirname, '..', 'form')),
    expect = require("chai").expect,
    YAML = require('yamljs'),
    config = YAML.load(path.join(__dirname, 'test-data', 'button-type.yml'));

describe('Type#button', function() {
    it('Case 1, usual case', function() {
        var buttonType = new Form(config.case1.login, 'login');
        expect(buttonType.field.someField.getData()).to.be.eql({
            "attr": {
                "name": "login-form-name",
                "type": "text",
                "style": {
                    margin: 0
                }
            },
            "label": "name",
            "name": "login-form-name",
            "type": "text"
        });
    });
    it('Case 2, test fieldNameAsArray property', function() {
        var buttonType = new Form(config.case2.login, 'login');
        console.log(buttonType.field);
        expect(buttonType.field.name.getData()).to.be.eql({
            "attr": {
                "name": "login[login-form-name]",
                "type": "text",
                "style": {
                    margin: 0
                }
            },
            "label": "name",
            "name": "login-form-name",
            "type": "text"
        });
    });
    it('Case 3, test array/object(mixed) notation of fields', function() {
        var buttonType = new Form(config.case4.login, 'login');
        expect(buttonType.field.name.getData()).to.be.eql({
            "attr": {
                "name": "login[name]",
                "type": "text"
            },
            "label": "custom-label",
            "name": "name",
            "type": "text"
        });
    });
    it('Case 4, test array/object(mixed) notation of fields name property not defined', function() {
        expect(function(){
            var buttonType = new Form(config.case5.login, 'login');
            console.log(buttonType.field.name.getData());
        }).to.throws(Error);
    });
});
