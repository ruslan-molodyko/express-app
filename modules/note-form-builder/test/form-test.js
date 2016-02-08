/**
 * Created by admin on 03.02.2016.
 */
var path = require('path'),
    Form = require(path.join(__dirname, '..', 'index')),
    expect = require("chai").expect;
    config = {
        action: '/login',
        method: 'post',
        name: 'login',
        attr: {
            class: '.my-form',
            style: {
                width: '250px',
                margin: 'auto'
            }
        },
        fields: {
            email: {
                label: 'email',
                type: 'text',
                name: 'email'
            },
            name: {
                label: 'name',
                type: 'text',
                name: 'name'
            }
        }
    };

describe('Form#initialization', function() {

    it('Form class is exists', function() {
        expect(Form).to.exist;
    });

    it('New form return object', function() {
        expect(new Form(config)).to.exist;
    });

    it('Form class not working without argument in constructor', function() {
        expect(function() {
            new Form()
        }).to.throw(Error);
    });

    it('Correct handle of arguments', function() {
        expect(function() {
            new Form(config);
        }).to.not.throw(Error);
    });
});

describe('Form#convert', function() {

    var form = new Form(config);

    it('Data exists', function() {
        expect(form).to.ownProperty('form');
    });

    it('Return object', function() {
        expect(form.convert()).to.be.a('object');
    });

    it('Return right value', function() {
       expect(form.convert()).to.eql({
            _form_: {
                name: 'login',
                attr: {
                    action: '/login',
                    method: 'post',
                    class: '.my-form',
                    style: {
                        width: '250px',
                        margin: 'auto'
                    }
                }
            },
            email: {
                label: 'email',
                attr: {
                    type: 'text',
                    name: 'email'
                }
            },
            name: {
                label: 'name',
                attr: {
                    type: 'text',
                    name: 'name'
                }
            }
        });
    });
});

describe('Form#initValue', function() {

    it('Data exists', function() {
        var form = new Form(config);
        expect(form).to.ownProperty('data');
    });

    it('Return right data', function() {
        var form = new Form({
            name: 'login',
            fields: {
                email: {}
            }
        });

        expect(form.data).to.eql({
            _form_: {
                name: 'login',
                attr: {
                    action: '/',
                    method: 'POST',
                    class: '.form-builder-login'
                }
            },
            email: {
                label: 'email',
                attr: {
                    type: 'text',
                    name: 'email'
                }
            }
        });
    });
});

describe('Form#getForm', function() {
    it('Equal values', function() {
        var form = new Form(config);
        expect(form.getForm()).to.eql(form.data);
    });
});
