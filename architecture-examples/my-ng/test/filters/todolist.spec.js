describe('todolist filter', function () {


    beforeEach(module('filters.todolist'));
    var todolistFilter;

    beforeEach(inject(function (_todolistFilter_) {
        todolistFilter = _todolistFilter_;
    }));

    var list = [{label: "1", completed: false}, {label: "2", completed: false}, {label: "3", completed: true}, {label: "4", completed: false}];
  
    it('should return all todos when filter is set to "all"', function () {
        expect(todolistFilter(list, "all")).to.be.equal(list);
    });

    it('should return completed todos when filter is set to "completed"', function () {
        expect(todolistFilter(list, "completed").length).to.be.equal(1);
    });

    it('should return active todos when filter is set to "active"', function () {
        expect(todolistFilter(list, "active").length).to.be.equal(3);
    });
});