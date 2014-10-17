describe('AppCtrl', function() {

    var scope;
    var ctrl;
    var todoStorage = {
        storage: {},
        get: function () {
            return this.storage;
        },
        put: function (value) {
            this.storage = value;
        }
    };

    beforeEach(module('controllers.appctrl'));
    beforeEach(inject(function ($rootScope, $controller, $browser) {
        scope = $rootScope.$new();
        ctrl = $controller('AppCtrl', {$scope: scope});
    }));

    it('should initialize properly', function() {
      expect(ctrl.todos.length).to.equal(0);
      expect(ctrl.newTodo).to.equal("");
      expect(ctrl.allCompleted).not.to.be.ok();
    });

    it('should react to URL change', inject(function($browser) {
        $browser.url('http://server/');
        $browser.poll();
        expect(ctrl.filterMode).to.equal("all");

        $browser.url('http://server/#/active');
        $browser.poll();
        expect(ctrl.filterMode).to.equal("active");

        $browser.url('http://server/#/completed');
        $browser.poll();
        expect(ctrl.filterMode).to.equal("completed");
    }));

    describe('having no Todos', function () {
        var ctrl;

        beforeEach(inject(function ($controller) {
            todoStorage.storage = [];
            ctrl = $controller('AppCtrl', {
                $scope: scope,
                todoStorage: todoStorage
            });
            scope.$digest();
        }));

        it('should not add empty Todos', function () {
            ctrl.newTodo = '';
            ctrl.addTodo({keyCode: 13});
            scope.$digest();
            expect(ctrl.todos.length).to.equal(0);
        });

        it('should not add items consisting only of whitespaces', function () {
            ctrl.newTodo = '   ';
            ctrl.addTodo({keyCode: 13});
            scope.$digest();
            expect(ctrl.todos.length).to.equal(0);
        });


        it('should trim whitespace from new Todos', function () {
            ctrl.newTodo = '  buy some unicorns  ';
            ctrl.addTodo({keyCode: 13});
            scope.$digest();
            expect(ctrl.todos.length).to.equal(1);
            expect(ctrl.todos[0].label).to.equal('buy some unicorns');
        });
    });

    describe('having some saved Todos', function () {
        var ctrl;

        beforeEach(inject(function ($controller) {
            todoList = [{
                    'label': 'Uncompleted Item 0',
                    'completed': false
                }, {
                    'label': 'Uncompleted Item 1',
                    'completed': false
                }, {
                    'label': 'Uncompleted Item 2',
                    'completed': false
                }, {
                    'label': 'Completed Item 0',
                    'completed': true
                }, {
                    'label': 'Completed Item 1',
                    'completed': true
                }];

            todoStorage.storage = todoList;
            ctrl = $controller('AppCtrl', {
                $scope: scope,
                todoStorage: todoStorage
            });
            scope.$digest();
        }));

        it('should count Todos correctly', function () {
            expect(ctrl.todos.length).to.equal(5);
            expect(ctrl.getActiveCount()).to.equal(3);
            expect(ctrl.allCompleted).not.to.be.ok();
        });

        it('should save Todos to local storage', function () {
            expect(todoStorage.storage.length).to.equal(5);
        });

        it('should remove Todos w/o title on saving', function () {
            var todo = todoList[2];
            todo.editing = true;
            todo.label = '';

            ctrl.stopEdit(null, 2);
            expect(ctrl.todos.length).to.equal(4);
        });

        it('should trim Todos on saving', function () {
            var todo = todoList[0];
            todo.editing = true;
            todo.label = ' buy moar unicorns  ';

            ctrl.stopEdit(null, 0);
            expect(ctrl.todos[0].label).to.equal('buy moar unicorns');
        });

        it('clearCompletedTodos() should clear completed Todos', function () {
            ctrl.clearCompleted();
            expect(ctrl.todos.length).to.equal(3);
        });

        it('toggleAll() should mark all Todos completed', function () {
            ctrl.toggleAll();
            scope.$digest();
            expect(ctrl.getActiveCount()).to.equal(0);

            ctrl.toggleAll();
            scope.$digest();
            expect(ctrl.getActiveCount()).to.equal(5);
        });

        it('revertTodo() get a Todo to its previous state', function () {
            var todo = todoList[0];
            ctrl.editTodo(null, 0);
            todo.label = 'Unicorn sparkly skypuffles.';
            ctrl.stopEdit({type: "keyup", keyCode: 27}, 0);
            scope.$digest();
            expect(ctrl.todos[0].label).to.equal('Uncompleted Item 0');
        });
    });

});
