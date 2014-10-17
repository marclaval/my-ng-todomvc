var gulp = require('gulp');
var gutil = require('gulp-util');
var http = require('http');
var connect = require('connect');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var _ = require('lodash');
var karmaConf = require('./karma.conf');

var wwwServerPort = 8080;
var myServer;
function startWWWServer(folder) {
    gutil.log('Starting WWW server at http://localhost:' + wwwServerPort);
    myServer = http.createServer(connect().use(connect.static('./' + folder)));
    myServer.listen(wwwServerPort);
}

gulp.task('checkstyle', function() {
    return gulp.src(['architecture-examples/my-ng/js/**/*.js', 'architecture-examples/my-ng/test/**/*.js']).
        pipe(jshint({eqnull: true})).
        pipe(jshint.reporter("default")).
        pipe(jshint.reporter("fail"));
});

gulp.task('test', ['checkstyle'], function (done) {
    karma.start(_.assign({}, karmaConf.common, karmaConf.test), done);
});

gulp.task('tdd', function (done) {
    karma.start(_.assign({}, karmaConf.common, karmaConf.tdd), done);
});

//WWW server
gulp.task('www', function() {
    startWWWServer('architecture-examples/my-ng');
});

//WWW server
gulp.task('wwwForMocha', function() {
    startWWWServer('');
});

gulp.task('default', ['www']);
