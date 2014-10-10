(function( window ) {
    'use strict';

    var app = angular.module('app', []);

    app.filter('todolist', function() {
        return function(todos, mode) {
            if (mode === "all") {
                return todos;
            }
            var result = [];
            for (var i = 0; i < todos.length; i++) {
                var todo = todos[i];
                if ((mode === "active" && todo.active) || (mode === "completed" && !todo.active)) {
                    result.push(todo);
                }
            }
            return result;
        };
    });

    app.controller("AppCtrl", function () {
        this.todos = [];
        this.newTodo = "";
        this.filterMode = "all";

        //test data
        this.todos.push({label: "Buy some milk", active: true, editing: false});
        this.todos.push({label: "Pay taxes", active: false, editing: false});
        this.todos.push({label: "Call dad", active: true, editing: true});
        this.todos.push({label: "Learn Angular", active: false, editing: true});

        this.addTodo = function(event) {
            if (event.keyCode === 13  && this.newTodo.length > 0) {
                this.todos.push({label: this.newTodo.trim(), active: true, editing: false});
                this.newTodo = "";
            }
        };

        this.getActiveCount = function() {
            var count = 0;
            for (var i = 0; i < this.todos.length; i++) {
                if (this.todos[i].active) {
                    count++;
                }
            }
            return count;
        };

        this.setFilter = function(filterMode) {
            this.filterMode = filterMode;
        };
    });

})( window );
