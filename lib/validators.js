/**
 * Created by admin on 04.02.2016.
 */
var PARAM = {
    minPass: 2, // Min length of password
    maxPass: 12 // Max length of password
};

module.exports = {

    /**
     * Validator of password
     */
    passwordLength: {
        validator: function() {
            return this._password1 != null && this._password1.length > PARAM.minPass && this._password1.length < PARAM.maxPass;
        },
        message: 'The password should be less than ' + PARAM.maxPass + ' and more than ' + PARAM.minPass
    },

    /**
     * Validator of email
     */
    email: {
        validator: function(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        message: 'Email {VALUE} is wrong'
    },

    /**
     * Required validator
     */
    required: {
        validator: function(value) {
            return value != null;
        },
        message: 'The value {VALUE} is empty'
    },

    /**
     * Check if fields of password is equal
     */
    repeatPassword: {
        validator: function() {
            return this._password1 === this._password2;
        },
        message: 'Password fields mast be equals'
    }
};
