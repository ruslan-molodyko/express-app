/**
 * Created by admin on 11.02.2016.
 */

'use strict';

require("blanket")({ pattern: function (filename) {
    return !/node_modules/.test(filename);
}});

var path = require('path'),
    Form = require(path.join(__dirname, '..', 'form')),
    expect = require("chai").expect,
    YAML = require('yamljs'),
    config = YAML.load(path.join(__dirname, 'test-data', 'select-type.yml'));

describe('Type#select', function () {
    it('Case 1, usual case', function () {
        var type = new Form(config.case1.login, 'login');
        expect(type.field.someField.getData()).to.be.eql({
            "type": "select",
            "attr": {
                "id": "login-someField-field",
                "name": "someName"
            },
            "label": "someField",
            "name": "someName",
            "options": [
                {
                    "name": "key1",
                    "value": "key1"
                },
                {
                    "name": "key2",
                    "value": "key2"
                },
                {
                    "name": "key3",
                    "value": "key3"
                }
            ]
        });
    });
    it('Case 2, test fieldNameAsArray property', function () {
        var type = new Form(config.case2.login, 'login');
        expect(type.field.selectField.getData()).to.be.eql({
            "type": "select",
            "attr": {
                "id": "login-selectField-field",
                "name": "login[selectField]"
            },
            "label": "selectField",
            "name": "selectField",
            "options": [
                {
                    "name": "key1",
                    "value": "key1"
                },
                {
                    "name": "key2",
                    "value": "key2"
                },
                {
                    "name": "key3",
                    "value": "key3"
                }
            ]
        });
    });
    it('Case 3, minimal data of type', function () {
        var type = new Form(config.case3.login, 'login');
        expect(type.field.selectField.getData()).to.be.eql({
            "type": "select",
            "attr": {
                "id": "login-selectField-field",
                "name": "selectField"
            },
            "label": "selectField",
            "name": "selectField",
            "options": []
        });
    });
    it('Case 4, simple object notation of options', function () {
        var type = new Form(config.case4.login, 'login');
        expect(type.field.selectField.getData()).to.be.eql({
            "type": "select",
            "attr": {
                "id": "login-selectField-field",
                "name": "selectField"
            },
            "label": "selectField",
            "name": "selectField",
            "options": [
                {
                    "name": "name1",
                    "value": "value1"
                },
                {
                    "name": "name2",
                    "value": "value2"
                },
                {
                    "name": "name3",
                    "value": "value3"
                }
            ]
        });
    });
    it('Case 5, complex object notation of options', function () {
        var type = new Form(config.case5.login, 'login');
        expect(type.field.selectField.getData()).to.be.eql({
            "type": "select",
            "attr": {
                "id": "login-selectField-field",
                "name": "selectField"
            },
            "label": "selectField",
            "name": "selectField",
            "options": [
                {
                    "name": "name1",
                    "value": "value1"
                },
                {
                    "name": "name2",
                    "value": "value2"
                },
                {
                    "name": "name3",
                    "value": "value3"
                }
            ]
        });
    });
    it('Case 6, test attr and label attributes', function () {
        var type = new Form(config.case6.login, 'login');
        expect(type.field.selectField.getData()).to.be.eql({
            "type": "select",
            "attr": {
                "id": "login-selectField-field",
                "name": "selectField",
                "style": {
                    "margin-top": "0px"
                }
            },
            "label": "some label",
            "name": "selectField",
            "options": []
        });
    });
});
