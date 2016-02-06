/**
 * Created by admin on 06.02.2016.
 */
var express = require('express'),
    User = require('../models/user'),
    form = require("express-form"),
    field = form.field,
    router = express.Router();

router.post('/signup', function(req, res, next) {
    res.send(res.body);
});

router.get('/signup', function(req, res, next) {

    res.render('signup', {title: 'Express'});
});

module.exports = router;
