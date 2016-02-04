/**
 * Created by admin on 04.02.2016.
 */
var mongoose = require('mongoose'),
    validate = require('../lib/validators'),
    User = mongoose.Schema({
        email: {
            type: String,
            validate: validate.email
        },
        passwordHash: {
            type: String,
            validate: [validate.required, validate.passwordLength, validate.repeatPassword]
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
        }
    });

User.virtual('password1')
    .get(function() {
        return this._password1;
    })
    .set(function(value) {
        this._password1 = value;
        //var salt = bcrypt.gen_salt_sync(12);
        this.passwordHash = value;
    });

User.virtual('password2')
    .get(function() {
        return this._password2;
    })
    .set(function(value) {
        this._password2 = value;
    });

User.statics.create = function (props) {
    return new this(props);
};

User.methods.update = function(callback) {
    this.save(function(err, result) {
        callback(err, result);
    });
};

module.exports = mongoose.model('User', User);
