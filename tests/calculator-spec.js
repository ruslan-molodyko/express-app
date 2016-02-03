/**
 * Created by admin on 03.02.2016.
 */
var calc = require("../lib/calculator");
var expect = require("chai").expect;

describe('calculator#add', function() {
    it('Missing arguments', function() {
        expect(calc.add()).to.equal(0);
    });
    it('Null argument', function() {
        expect(calc.add(null)).to.equal(0);
    });
    it('Undefined argument', function() {
        expect(calc.add(undefined)).to.equal(0);
    });
    it('One argument', function() {
        expect(calc.add(33)).to.equal(33);
    });
    it('Two argument', function() {
        expect(calc.add(3, 3)).to.equal(6);
    });
    it('Many arguments', function() {
        expect(calc.add(3, 3, 0, 44, 2)).to.equal(52);
    });
});
