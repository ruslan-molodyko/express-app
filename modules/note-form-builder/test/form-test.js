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
    config = YAML.load(path.join(__dirname, 'test-data', 'form.yml')),
    expect = require("chai").expect;

describe('Form#initialization', function () {
    it('Init form, empty data', function () {
        expect(function () {
            new Form();
        }).to.throws(Error);
    });
    it('Init form, form name not exists', function() {
        expect(function () {
            new Form({});
        }).to.throws(Error);
    });
    it('Case 1, usual form', function () {
        var data = new Form(config.case1.signup, 'login');
        expect(data.getForm()).to.be.eql({
            "attr": {
                "style": {
                    "margin": "auto",
                    "width": "200px"
                }
            },
            "fieldNameAsArray": false,
            "name": 'login',
            "field": {
                "email": {
                    "attr": {
                        "id": "login-email-field",
                        "name": "email",
                        "type": "text"
                    },
                    "label": "email",
                    "name": "email",
                    "type": "text"
                },
                "lastName": {
                    "attr": {
                        "id": "login-lastName-field",
                        "name": "lastName",
                        "type": "text"
                    },
                    "label": "lastName",
                    "name": "lastName",
                    "type": "text"
                },
                "name": {
                    "attr": {
                        "id": "login-name-field",
                        "name": "name",
                        "type": "text"
                    },
                    "label": "name",
                    "name": "name",
                    "type": "text"
                },
                "password1": {
                    "attr": {
                        "id": "login-password1-field",
                        "name": "password1",
                        "type": "text"
                    },
                    "label": "password1",
                    "name": "password1",
                    "type": "text"
                },
                "password2": {
                    "attr": {
                        "id": "login-password2-field",
                        "name": "password2",
                        "type": "text"
                    },
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
            }
        });
    });
    it('Case 2, readme form example', function () {
        var data = new Form(config.case2.login, 'login');
        expect(data.getForm()).to.be.eql({
            "attr": {
                "style": {
                    "margin": "auto",
                    "width": "200px"
                }
            },
            "field": {
                "age": {
                    "attr": {
                        "id": "login-age-field",
                        "name": "age",
                        "type": "text"
                    },
                    "label": "age",
                    "name": "age",
                    "type": "text"
                },
                "email": {
                    "attr": {
                        "id": "login-email-field",
                        "name": "login-email",
                        "type": "text"
                    },
                    "label": "Email",
                    "name": "login-email",
                    "type": "text"
                },
                "gender": {
                    "type": "select",
                    "attr": {
                        "id": "login-gender-field",
                        "name": "gender"
                    },
                    "label": "gender",
                    "name": "gender",
                    "options": [
                        {
                            "name": "hello",
                            "value": "one"
                        },
                        {
                            "name": "second",
                            "value": "second"
                        }
                    ]
                },
                "lastName": {
                    "attr": {
                        "id": "login-lastName-field",
                        "name": "lastName",
                        "type": "text"
                    },
                    "label": "lastName",
                    "name": "lastName",
                    "type": "text"
                },
                "name": {
                    "attr": {
                        "id": "login-name-field",
                        "name": "name",
                        "type": "text"
                    },
                    "label": "name",
                    "name": "name",
                    "type": "text"
                },
                "password1": {
                    "attr": {
                        "id": "login-password1-field",
                        "name": "password1",
                        "type": "text"
                    },
                    "label": "password1",
                    "name": "password1",
                    "type": "text"
                },
                "password2": {
                    "attr": {
                        "id": "login-password2-field",
                        "name": "password2",
                        "type": "text"
                    },
                    "label": "password2",
                    "name": "password2",
                    "type": "text"
                },
                "submit": {
                    "attr": {
                        "id": "login-submit-field",
                        "type": "submit"
                    },
                    "label": "submit",
                    "type": "button"
                }
            },
            "fieldNameAsArray": false,
            "name": "login"
        });
    });
    it('Case 3, the same field names', function () {
        expect(function () {
            var data = new Form(config.case3.login, 'login');
            data.getForm();
        }).to.be.throws(/already used/);
    });
});
