angular.module('dropinAdmin')
.controller('PlaceEditController', function($scope, DropinService, $stateParams){
    console.log('PDC: '+JSON.stringify($stateParams));
    
    $scope.place = $stateParams.place;

    var placeholder;
    
    function addPlaceholderMarker(place) {

        var myLatLng = {
            lat: place.geometry.coordinates[0],
            lng: place.geometry.coordinates[1]
        };

        var placeholder = new google.maps.Marker({
            position: myLatLng,
            map: map,
            draggable: true,
            //            icon: PaletteService.getMapPinForStop(stop),
            title: 'Hello World!'
        });

        return placeholder;
    }
    
    $scope.$on('MAP_LOADED', function (e, _map) {
        map = _map;
        $scope.map = map;
        
        placeholder = addPlaceholderMarker($scope.place);
        map.setCenter(placeholder.getPosition());
        
        placeholder.addListener('dragend', function(){
            map.panTo(placeholder.getPosition());
        });
    });
    
    
    $scope.savePlace = function() {
        
    }
    
});