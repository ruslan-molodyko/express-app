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
    config = YAML.load(path.join(__dirname, 'test-data', 'button-type.yml'));

describe('Type#button', function () {
    it('Case 1, usual case', function () {
        var buttonType = new Form(config.case1.login, 'login');
        expect(buttonType.field.someField.getData()).to.be.eql({
            "attr": {
                "type": "submit"
            },
            "label": "someField",
            "type": "button"
        });
    });
    it('Case 2, test fieldNameAsArray property', function () {
        var buttonType = new Form(config.case2.login, 'login');
        expect(buttonType.field.name.getData()).to.be.eql({
            "attr": {
                "style": {
                    "margin": 0
                },
                "type": "submit"
            },
            "label": "name",
            "type": "button"
        });
    });
    it('Case 3, test array/object(mixed) notation of fields', function () {
        var buttonType = new Form(config.case3.login, 'login');
        expect(buttonType.field.name.getData()).to.be.eql({
            "attr": {
                "type": "submit"
            },
            "label": "custom-label",
            "type": "button"
        });
    });
    it('Case 4, test array/object(mixed) notation of fields name property not defined', function () {
        expect(function () {
            var buttonType = new Form(config.case5.login, 'login');
        }).to.throws(Error);
    });
});
