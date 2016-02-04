/**
 * Created by admin on 04.02.2016.
 */
var mongooseMock = require('mongoose-mock'),
    proxyquire = require('proxyquire'),
    chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe('User', function () {

    var User;

    beforeEach(function () {
        User = proxyquire('../../models/User', { 'mongoose': mongooseMock });
    });

    describe('Create user', function() {
        var testData = { name: 'Ruslan', lastName: 'White', gender: 'male'};

        it('Is right type object', function() {
            var user = User.create(testData);
            expect(user).to.be.an.instanceOf(User);
        });

        it('Correct data', function() {
            var user = User.create(testData);
            expect(user.name).to.equal(testData.name);
            expect(user.lastName).to.equal(testData.lastName);
            expect(user.gender).to.equal(testData.gender);
        })
    });

    describe('User test', function () {
        it('Create new user', function () {
            var callback = sinon.spy();
            var user = User.create({ name: 'Ruslan', lastName: 'White', gender: 'male'});
            expect(user).calledOnce;
        });
        it('Update existing user', function () {
            var callback = sinon.spy();
            var user = User.create({ name: 'Ruslan', lastName: 'White', gender: 'male'}, function(){});
            user.save(callback);
            expect(user.save).calledOnce;
        });
    });
});
