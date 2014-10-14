angular.module('directives.focusonshow', [])

.directive("focusonshow", function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            setTimeout(function() {
                element[0].focus();
            }, 0);
        }
    };
});