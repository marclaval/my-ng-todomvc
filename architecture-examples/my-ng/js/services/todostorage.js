angular.module('services.todostorage', [])

.factory('todoStorage', function ($http, $timeout) {
    'use strict';

    var STORAGE_ID = 'todos-mine';
    var MONGO_ID = null;
    var TIMEOUT_PROMISE = null;

    return {
        get: function (cb) {
            var _this = this;
            this.remoteGet(function(data){
                if (data && data.length === 0) {
                    _this.remoteCreate(function(data) {
                        _this._storeIdAndData(data[0], cb);
                    });
                }
                else {
                    _this._storeIdAndData(data[0], cb);
                }
            },
            function() {
                cb(angular.fromJson(localStorage.getItem(STORAGE_ID)) || []);
            });
        },

        _storeIdAndData: function(data, cb) {
            MONGO_ID = data._id.$oid;
            cb(data.todolist);
        },

        set: function (todos) {
            localStorage.setItem(STORAGE_ID, angular.toJson(todos));
            if (MONGO_ID) {
                if (TIMEOUT_PROMISE) {
                    $timeout.cancel(TIMEOUT_PROMISE);
                    TIMEOUT_PROMISE = null;
                }
                var _this = this;
                TIMEOUT_PROMISE = $timeout(function() {
                    _this.remoteUpdate(todos);
                }, 5000, false);
                
            }
        },

        remoteGet: function(cb, cb2) {
            $http.get('https://api.mongolab.com/api/1/databases/js-xperiment/collections/todomvc', {
                params:{
                    apiKey:'rgwHsILbUV1v5nfrtVTuqlooPcYAV-_h'
                }
            })
            .success(function (data, status, headers, config) {
                cb(data);
            })
            .error(function (data, status, headers, config) {
                cb2();
                console.log('Something went wrong in remoteGet...');
            });
        },

        remoteCreate: function(cb) {
            $http.post('https://api.mongolab.com/api/1/databases/js-xperiment/collections/todomvc', {}, {
                params:{
                    apiKey:'rgwHsILbUV1v5nfrtVTuqlooPcYAV-_h'
                }
            })
            .success(function (data, status, headers, config) {
                cb(data);
            })
            .error(function (data, status, headers, config) {
                console.log('Something went wrong in remoteCreate...');
            });
        },

        remoteUpdate: function(doc) {
            var toBeSent = {todolist: doc};
            $http.put('https://api.mongolab.com/api/1/databases/js-xperiment/collections/todomvc/' + MONGO_ID, toBeSent, {
                params:{
                    apiKey:'rgwHsILbUV1v5nfrtVTuqlooPcYAV-_h'
                }
            })
            .success(function (data, status, headers, config) {
                //do nothing
            })
            .error(function (data, status, headers, config) {
                console.log('Something went wrong in remoteUpdate...');
            });
        }
    };
});
