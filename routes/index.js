var express = require('express'),
    User = require('../models/user'),
    router = express.Router();

router.all('/signup', function(req, res, next) {
    var form = req.body,
        user = User.create(form),
        error = user.validateSync();

    if (!error) {
        user.save(function(err, model) {
            console.log(err, model);
        });
    }
    res.render('index', {title: 'Express', error: error ? error.toString() : null});
});

router.get('/', function(req, res, next) {
    console.log(req.body);
    //var user = new User({
    //    email: 'sdfsdf',
    //    pass: '1',
    //    name: 'John',
    //    lastName: 'Silence',
    //    gender: 'male'
    //});
    //console.log(user.validateSync().toString());
    //user.save(function(err, model) {
    //    //console.log(err, model);
    //});
    res.render('index', { title: 'Express' });
});

module.exports = router;
