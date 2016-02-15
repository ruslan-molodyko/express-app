/**
 * Created by admin on 15.02.2016.
 */
var gulp = require('gulp'),
    exec = require('child_process').exec;

gulp.task('coverage', function () {
    exec("_mocha C:\\node\\app\\modules\\note-form-builder\\test --require blanket --reporter html-cov > public/coverage.html", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('watch', function() {
    gulp.watch('modules/note-form-builder/**/*.js', ['coverage']);
});