describe('todo local storage', function () {

    var store = "";
    var todoStorage, http, $httpBackend;
    beforeEach(module('services.todostorage'));
    beforeEach(inject(function (_todoStorage_, _$httpBackend_) {
        todoStorage = _todoStorage_;
        $httpBackend = _$httpBackend_;

        $httpBackend
            .whenPUT('https://api.mongolab.com/api/1/databases/js-xperiment/collections/todomvc?apiKey=rgwHsILbUV1v5nfrtVTuqlooPcYAV-_h')
            .respond([]);
    }));
  
    it('should give access to the stored todos', function () {
        var todos =  [{
                        'label': 'Uncompleted Item 0',
                        'completed': false
                    }, {
                        'label': 'Uncompleted Item 1',
                        'completed': false
                    }];
        $httpBackend
            .whenGET('https://api.mongolab.com/api/1/databases/js-xperiment/collections/todomvc?apiKey=rgwHsILbUV1v5nfrtVTuqlooPcYAV-_h')
            .respond([ { "_id" : { "$oid" : "5447aa92e4b03389d7e268e1"} , "todolist" : todos}]);
        var storedTodos = [];

        todoStorage.set([]);
        expect(angular.fromJson(localStorage.getItem('todos-mine')).length).to.equal(0);
        todoStorage.get(function(data){storedTodos = data;});
        expect(storedTodos.length).to.equal(0);
        $httpBackend.flush();
        expect(storedTodos.length).to.equal(2);

        todoStorage.set([]);
        expect(angular.fromJson(localStorage.getItem('todos-mine')).length).to.equal(0);
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});