angular.module('services.todostorage', [])

.factory('todoStorage', function () {
    'use strict';

    var STORAGE_ID = 'todos-mine';

    return {
        get: function () {
            return angular.fromJson(localStorage.getItem(STORAGE_ID)) || [];
        },

        set: function (todos) {
            localStorage.setItem(STORAGE_ID, angular.toJson(todos));
        }
    };
});
