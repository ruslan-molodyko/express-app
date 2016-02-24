/**
 * Created by admin on 06.02.2016.
 */

'use strict';

var express = require('express'),
    User = require('../models/user'),
    form = require("express-form"),
    formSignUp = require('../lib/form-builder'),
    Form = require('../modules/note-form-builder').Form,
    field = form.field,
    router = express.Router(),
    YAML = require('yamljs'),
    configForm = YAML.load('./config/forms/security.yml');

router.post('/signup', function (req, res) {
    res.send(res.body);
});

router.get('/signup', function (req, res) {

    console.log(configForm.signup);
    var formView = (new Form(configForm.signup, 'signup')).getForm();
    console.log(formView);
    res.render('signup', {title: 'Express', form: formView});
});

module.exports = router;
