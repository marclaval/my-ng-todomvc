angular.module('filters.todolist', [])

.filter('todolist', function() {
    'use strict';
    
    return function(todos, mode) {
        if (mode === "all") {
            return todos;
        }
        var result = [];
        for (var i = 0; i < todos.length; i++) {
            var todo = todos[i];
            if ((mode === "active" && !todo.completed) || (mode === "completed" && todo.completed)) {
                result.push(todo);
            }
        }
        return result;
    };
});