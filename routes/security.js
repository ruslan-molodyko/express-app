/**
 * Created by admin on 06.02.2016.
 */
var express = require('express'),
    User = require('../models/user'),
    form = require("express-form"),
    formSignUp = require('../lib/form-builder'),
    Form = require('../modules/note-form-builder'),
    field = form.field,
    router = express.Router(),
    YAML = require('yamljs'),
    configForm = YAML.load('./config/forms/security.yml')
    ;

router.post('/signup', function(req, res, next) {
    res.send(res.body);
});

router.get('/signup', function(req, res, next) {

    console.log(configForm);

    res.render('signup', {title: 'Express', form: (new Form(configForm.signup)).getForm()});
});

module.exports = router;
