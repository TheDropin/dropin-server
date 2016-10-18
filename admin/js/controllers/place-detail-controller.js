angular.module('dropinAdmin')
.controller('PlaceDetailController', function($scope, DropinService, $stateParams){
    console.log('PDC: '+JSON.stringify($stateParams));
    
    $scope.place = $stateParams.place;
    
    
});