angular.module('dropinAdmin').controller('AccountController', function($scope, DropinService, $state){
    
    $scope.user = {};

    $scope.signup = function() {
        DropinService.signup($scope.user)
            .then(function(response){
                $state.go('login');
            });
    };
    
    $scope.authenticate = function() {
        DropinService.authenticate($scope.user)
            .then(function(response){
                $state.go('places');
            });
    };
    
    $scope.logout = function() {
        DropinService.logout()
            .then(function(response){
                $state.go('login');
            });
    }
    
});