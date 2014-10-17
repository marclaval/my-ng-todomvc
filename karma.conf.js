exports.common = {
    reporters: ['dots'],
    browsers: ['Firefox'],
    files: [
        'https://code.angularjs.org/1.3.0/angular.js',
        'https://code.angularjs.org/1.3.0/angular-mocks.js',
        'architecture-examples/my-ng/js/**/*.js',
        'architecture-examples/my-ng/test/**/*.spec.js',
        './node_modules/sinon/pkg/sinon-ie.js'
    ],
    frameworks: ['mocha', 'expect', 'sinon']
};

exports.test = {
    singleRun: true,
    preprocessors: {
      'architecture-examples/my-ng/js/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type : 'html', //Set to html instead of lcovonly to get a readable report
      dir : 'test-results/karma/'
    }
};

exports.tdd = {
    singleRun: false,
    reporters: ['progress'],
    autoWatch: true
};
