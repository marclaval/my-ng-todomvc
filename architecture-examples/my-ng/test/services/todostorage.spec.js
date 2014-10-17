describe('todo local storage', function () {

    var store = "";
    var todoStorage;
    beforeEach(module('services.todostorage'));
    beforeEach(inject(function (_todoStorage_) {
      todoStorage = _todoStorage_;
    }));
  
    it('should give access to the stored todos', function () {
        var todos =  [{
                        'label': 'Uncompleted Item 0',
                        'completed': false
                    }, {
                        'label': 'Uncompleted Item 1',
                        'completed': false
                    }];
        todoStorage.set(todos);
        expect(todoStorage.get().length).to.equal(2);

        todoStorage.set([]);
        expect(todoStorage.get().length).to.equal(0);
    });
});