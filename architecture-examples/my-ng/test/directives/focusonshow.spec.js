describe('focusonshow directive', function () {


    beforeEach(module('directives.focusonshow'));
    var $scope, $compile, $browser, $timeout;

    beforeEach(inject(function (_$rootScope_, _$compile_, _$browser_, _$timeout_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $browser = _$browser_;
        $timeout = _$timeout_;
    }));

    it('should focus on truthy expression', function () {
        var el = angular.element('<input focusonshow>');
        $scope.$digest();

        $compile(el)($scope);
        expect($browser.deferredFns.length).to.be.equal(1);

        $timeout.flush();

        expect($browser.deferredFns.length).to.be.equal(0);
    });
});