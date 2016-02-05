/**
 * Created by admin on 04.02.2016.
 */
var mongoose = require('mongoose'),
    passwordHash = require('password-hash'),
    validate = require('../lib/validators'),

    /**
     * User model with validations
     */
    User = mongoose.Schema({
        email: {
            type: String,
            validate: validate.email
        },
        name: {
            type: String,
            validate: validate.required
        },
        lastName: {
            type: String,
            validate: validate.required
        },
        gender: {
            type: String,
            enum: [
                'male',
                'female'
            ],
            validate: validate.required
        },
        passwordHash: {
            type: String,
            validate: [validate.required, validate.passwordLength, validate.repeatPassword]
        }
    });

/**
 * Create virtual field for add password repeat logic
 */
User.virtual('password1')
    .get(function() {
        return this._password1;
    })
    .set(function(value) {
        this._password1 = value;

        // Hash password
        this.passwordHash = passwordHash.generate(value);
    });

/**
 * Create virtual field for add password repeat logic
 */
User.virtual('password2')
    .get(function() {
        return this._password2;
    })
    .set(function(value) {
        this._password2 = value;
    });

/**
 * Create user, just wrapper to new statement
 * @param props
 * @returns {User.statics}
 */
User.statics.create = function (props) {
    return new this(props);
};

/**
 * Update entity
 * @param callback
 */
User.methods.update = function(callback) {
    this.save(function(err, result) {
        callback(err, result);
    });
};

/**
 * Create and return model
 * @type {*|Model|Aggregate}
 */
module.exports = mongoose.model('User', User);
