angular.module('FacebookModule', []).factory('Facebook', function() {
    return function() {
        return FB;
    };
});