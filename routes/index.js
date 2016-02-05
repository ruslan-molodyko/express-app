/**
 * Created by admin on 06.02.2016.
 */
var express = require('express'),
    User = require('../models/user'),
    form = require("express-form"),
    field = form.field,
    router = express.Router();

router.all('/signup', function(req, res, next) {

    //var form = req.body,
        //user = User.create(form),
        //error = user.validateSync();
    //
    //if (!error) {
    //    user.save(function(err, model) {
    //        console.log(err, model);
    //    });
    //}
    res.render('index', {title: 'Express', error: ''});
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
