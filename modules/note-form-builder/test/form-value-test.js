/**
 * Created by admin on 03.02.2016.
 */

'use strict';

require("blanket")({ pattern: function (filename) {
    return !/node_modules/.test(filename);
}});

var path = require('path'),
    Form = require(path.join(__dirname, '..', 'index')).Form,
    YAML = require('yamljs'),
    config = YAML.load(path.join(__dirname, 'test-data', 'form-value.yml')),
    expect = require("chai").expect;

describe('Form#initValues', function () {
    it('Case 1, usual form', function () {
        var data = new Form(config.formCase1.login, 'login', config.valueCase1.login);
        expect(data.getForm()).to.be.eql({
            "attr": {},
            "name": 'login',
            "field": {
                "email": {
                    "attr": {
                        "id": "login-email-field",
                        "name": "email",
                        "type": "text",
                        "value": "molodyko13@gmail.com"
                    },
                    "value": "molodyko13@gmail.com",
                    "label": "email",
                    "name": "email",
                    "type": "text"
                },
                "lastName": {
                    "attr": {
                        "value": "Molodyko",
                        "id": "login-lastName-field",
                        "name": "lastName",
                        "type": "text"
                    },
                    "value": "Molodyko",
                    "label": "lastName",
                    "name": "lastName",
                    "type": "text"
                },
                "name": {
                    "attr": {
                        "value": "Ruslan",
                        "id": "login-name-field",
                        "name": "name",
                        "type": "text"
                    },
                    "value": "Ruslan",
                    "label": "name",
                    "name": "name",
                    "type": "text"
                },
                "password1": {
                    "attr": {
                        "value": 123456,
                        "id": "login-password1-field",
                        "name": "password1",
                        "type": "text"
                    },
                    "value": 123456,
                    "label": "password1",
                    "name": "password1",
                    "type": "text"
                },
                "password2": {
                    "attr": {
                        "value": 123456,
                        "id": "login-password2-field",
                        "name": "password2",
                        "type": "text"
                    },
                    "value": 123456,
                    "label": "password2",
                    "name": "password2",
                    "type": "text"
                },
                "submit": {
                    "attr": {
                        "id": "login-submit-field",
                        "name": "submit",
                        "type": "text"
                    },
                    "label": "submit",
                    "name": "submit",
                    "type": "text"
                }
            },
            "fieldNameAsArray": false
        });
    });
});
