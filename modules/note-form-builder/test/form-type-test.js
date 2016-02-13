/**
 * Created by admin on 11.02.2016.
 */
require("blanket")({ pattern: function (filename) {
    return !/node_modules/.test(filename);
} });
var path = require('path'),
    FormType = require(path.join(__dirname, '..', 'types', 'form')),
    expect = require("chai").expect,
    YAML = require('yamljs'),
    config = YAML.load(path.join(__dirname, 'test-data', 'form-type.yml'));

describe('Type#form', function() {
    it('Case 1, usual case', function() {
        var formType = new FormType(config.case1.login, 'login');
        expect(formType.getData()).to.be.eql({
            "attr": {style: {margin: 0}},
            "fieldNameAsArray": true,
            "fields": {},
            "name": "login-form-name"
        });
    });
    it('Case 2, name not defined', function() {
        var formType = new FormType(config.case2.login, 'login');
        expect(formType.getData()).to.be.eql({
            "attr": {style: {margin: 0}},
            "fieldNameAsArray": true,
            "fields": {},
            "name": "login"
        });
    });
    it('Minimal object with form name', function() {
        var formType = new FormType(config.case3.login, 'login');
        expect(formType.getData()).to.be.eql({
            "attr": {},
            "fieldNameAsArray": false,
            "fields": {},
            "name": "login"
        });
    });
    it('Form data is null', function() {
        expect(function() {
            var formType = new FormType(null, 'login');
            formType.getData()
        }).to.be.throws(Error);
    });
    it('Form name is null', function() {
        expect(function() {
            var formType = new FormType({fields: {}}, null);
            formType.getData()
        }).to.be.throws(Error);
    });
});
