/**
 * Created by admin on 06.02.2016.
 */
var path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require(path.join(__dirname, '..', 'models/user'));

/**
 * Manage the login and logout logic
 * @param app
 */
module.exports = function(app) {

    /**
     * Handle login
     */
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, function(email, password, done) {
            User.findOne({ email: email}, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

    /**
     * Handle login
     */
    app.post('/login',
        passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/signup',
                failureFlash: 'Invalid username or password.'
            }
        )
    );
};
