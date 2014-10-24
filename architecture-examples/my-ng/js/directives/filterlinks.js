angular.module('directives.filterlinks', [])

.directive("filterlinks", function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/partials/filterlinks.tpl.html'
    };
});
