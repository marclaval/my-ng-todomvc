describe('filterlinks directive', function () {

    beforeEach(module('directives.filterlinks'));
    beforeEach(module('js/partials/filterlinks.tpl.html'));

    var $scope, $compile;

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
    }));

    it('should render filter links', function () {
        var el = angular.element('<filterlinks></filterlinks>');
        $compile(el)($scope);
        $scope.appCtrl = {filterMode: "active"};
        $scope.$digest();
        expect(el[0].tagName).to.equal("UL");
        expect(el.find('li').length).to.equal(3);
        expect(el.find('a')[0].className).to.equal("");
        expect(el.find('a')[1].className).to.equal("selected");
        expect(el.find('a')[2].className).to.equal("");
    });
});