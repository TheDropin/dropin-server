angular.module('dropinAdmin').controller('AccountController', function($scope, DropinService){
    
    $scope.user = {};
    
    $scope.signup = function() {
        DropinService.signup($scope.user);
    };
    
    $scope.authenticate = function() {
        DropinService.authenticate($scope.user);
    };
    
});