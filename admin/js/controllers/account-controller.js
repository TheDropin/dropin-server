angular.module('dropinAdmin').controller('AccountController', function($scope, AccountService, $state){
    
    $scope.user = {};

    $scope.signup = function() {
        AccountService.signup($scope.user)
            .then(function(response){
                $state.go('login');
            });
    };
    
    $scope.authenticate = function() {
        AccountService.authenticate($scope.user)
            .then(function(response){
                $state.go('places');
            });
    };
    
    $scope.logout = function() {
        AccountService.logout()
            .then(function(response){
                $state.go('login');
            });
    }
    
});