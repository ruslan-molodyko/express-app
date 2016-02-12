/**
 * Created by admin on 11.02.2016.
 */
var path = require('path'),
    TextType = require(path.join(__dirname, '..', 'types', 'text')),
    Form = require(path.join(__dirname, '..', 'form')),
    expect = require("chai").expect,
    YAML = require('yamljs'),
    config = YAML.load(path.join(__dirname, 'test-data', 'text-type.yml'));

describe('Type#text', function() {
    it('Case 1', function() {
        var textType = new TextType(new Form(config.case1.login, 'login'), 'name');
        expect(textType.getData()).to.be.eql({
            "attr": {
                "name": "name",
                "type": "text"
            },
            "label": "name",
            "name": "name",
            "type": "text"
        });
    });
});
