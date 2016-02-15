/**
 * Created by admin on 03.02.2016.
 */
require("blanket")({ pattern: function (filename) {
    return !/node_modules/.test(filename);
} });

var path = require('path'),
    Form = require(path.join(__dirname, '..', 'index')).Form,
    expect = require("chai").expect;

describe('Form#initialization', function() {
    it('Init form, empty data', function() {
        expect(function() {
            new Form();
        }).to.throws(Error);
    });
    it('Init form, form name not exists', function() {
        expect(function() {
            new Form({});
        }).to.throws(Error);
    });
});
