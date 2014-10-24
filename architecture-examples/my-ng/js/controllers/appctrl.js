angular.module('controllers.appctrl', ['services.todostorage'])

.controller("AppCtrl", function ($scope, $rootScope, $location, todoStorage) {
    'use strict';

    this.todos = [];
    todoStorage.get(angular.bind(this, function(data) {
        this.todos = data;
    }));
    this.newTodo = "";
    this.allCompleted = false;

    this.addTodo = function(event) {
        if (event.keyCode === 13  && this.newTodo.length > 0) {
            if (this.newTodo.trim() !== "") {
                this.todos.push({label: this.newTodo.trim(), completed: false, editing: false});
            }
            this.newTodo = "";
        }
    };

    this.rmTodo = function(index) {
        this.todos.splice(index, 1);
    };

    this.editTodo = function(event, index) {
        this.stopEdit(null);
        this.previousValue = this.todos[index].label;
        this.todos[index].editing = true;
    };

    this.stopEdit = function(event, index) {
        if (event == null || event.type == "keyup" && event.keyCode === 13 || event.type == "blur") {
            for (var i = this.todos.length; i > 0 ; i--) {
                var idx = i - 1;
                var todo = this.todos[idx];
                if (todo.editing) {
                    todo.label = todo.label.trim();
                    todo.editing = false;
                    todoStorage.set(this.todos);
                }
                if (todo.label === "") {
                    this.todos.splice(idx, 1);
                }
            }
        }
        else if (event.type == "keyup" && event.keyCode === 27) {
            //cancelling edit
            this.todos[index].label = this.previousValue;
            this.todos[index].editing = false;
        }
    };

    this.getActiveCount = function() {
        var count = 0;
        for (var i = 0; i < this.todos.length; i++) {
            if (!this.todos[i].completed) {
                count++;
            }
        }
        return count;
    };

    this.toggleAll = function() {
        var activateAll = this.getActiveCount() !== 0;
        for (var i = 0; i < this.todos.length; i++) {
            this.todos[i].completed = activateAll;
        }
    };

    this.clearCompleted = function() {
        for (var i = this.todos.length; i > 0 ; i--) {
            var index = i - 1;
            if (this.todos[index].completed) {
                this.todos.splice(index, 1);
            }
        }
        todoStorage.set(this.todos);
    };

    this._setFilterFromPath = function(rawPath) {
        var path = rawPath.replace("/", "");
        var isValidPath = path === "active" || path === "completed";
        this.filterMode = isValidPath? path: "all";
    };

    $scope.$watch(angular.bind(this, function () {
        return this.getActiveCount();
    }), angular.bind(this, function (newVal, oldVal) {
        this.allCompleted = newVal === 0;
        todoStorage.set(this.todos);
    }));

    $scope.$watch(function () {
        return $location.path();
    }, angular.bind(this, function (newPath) {
        this._setFilterFromPath(newPath);
    }));

});