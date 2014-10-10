var gulp = require('gulp');
var gutil = require('gulp-util');
var http = require('http');
var connect = require('connect');

var wwwServerPort = 8080;

function startWWWServer(folder) {
    gutil.log('Starting WWW server at http://localhost:' + wwwServerPort);
    http.createServer(connect().use(connect.static('./' + folder))).listen(wwwServerPort);
}

gulp.task('www', function() {
    startWWWServer('src');
});

gulp.task('default', ['www']);
