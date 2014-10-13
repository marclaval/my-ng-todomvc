var gulp = require('gulp');
var gutil = require('gulp-util');
var http = require('http');
var connect = require('connect');
var mocha = require('gulp-mocha');

var wwwServerPort = 8080;
var myServer;
function startWWWServer(folder) {
    gutil.log('Starting WWW server at http://localhost:' + wwwServerPort);
    myServer = http.createServer(connect().use(connect.static('./' + folder)));
    myServer.listen(wwwServerPort);
}

//WWW server
gulp.task('www', function() {
    startWWWServer('architecture-examples/my-ng');
});

//WWW server
gulp.task('wwwForMocha', function() {
    startWWWServer('');
});

gulp.task('default', ['www']);
