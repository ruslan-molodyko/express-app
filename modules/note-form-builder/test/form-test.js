/**
 * Created by admin on 03.02.2016.
 */
var path = require('path'),
    Form = require(path.join(__dirname, '..', 'index')),
    YAML = require('yamljs'),
    expect = require("chai").expect,
    config = YAML.load(path.join(__dirname, '..', '..', '..', 'config/forms/security.yml'))
    ;

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

describe('Form#initDefault', function() {
    var form = new Form(config);
    it('Data exists', function() {
        expect(form).to.ownProperty('form');
    });
});
