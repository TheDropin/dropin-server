angular.module('dropinAdmin').controller('AccountController', function($scope, DropinService, $state){
    
    $scope.user = {};
    
    $scope.signup = function() {
        DropinService.signup($scope.user)
    };
    
    $scope.authenticate = function() {
        DropinService.authenticate($scope.user)
            .then(function(response){
                $state.go('places');
            });
    };
    
    $scope.logout = function() {
        DropinService.logout();
    }
    
});