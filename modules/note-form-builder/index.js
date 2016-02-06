/**
 * Created by admin on 06.02.2016.
 */

var Abone = require('abone'),
    jade = require('jade')
    ;

var Form = Abone.create(function() {
    this.constructor = function() {
        var html = jade.compileFile(__dirname + '/template.jade');
        console.log(html({type: 'text', mode: 'widget', label: 'label-label', name: 'email', attrs: {
            attr1: 'attr1',
            attr2: 'attr2',
            class: 'sdfsdf'
        }}));
    };
});

module.exports = Form;