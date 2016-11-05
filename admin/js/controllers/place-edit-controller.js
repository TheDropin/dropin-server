angular.module('dropinAdmin')
.controller('PlaceEditController', function($scope, DropinService, $stateParams){
    console.log('PDC: '+JSON.stringify($stateParams));
    
    $scope.place = $stateParams.place;

    
    function addPlaceholderMarker(place) {

        var myLatLng = {
            lat: place.geometry.coordinates[0],
            lng: place.geometry.coordinates[1]
        };

        placeholder = new google.maps.Marker({
            position: myLatLng,
            map: map,
            draggable: true,
            //            icon: PaletteService.getMapPinForStop(stop),
            title: 'Hello World!'
        });

        return myLatLng;
    }
    
    $scope.$on('MAP_LOADED', function (e, _map) {
        map = _map;
        $scope.map = map;
        
        var placeLatLng = addPlaceholderMarker($scope.place);
        map.setCenter(placeLatLng);

        map.addListener('idle', function () {

            var bounds = map.getBounds().toJSON();
            var query = {
                xmin: bounds.west,
                xmax: bounds.east,
                ymin: bounds.south,
                ymax: bounds.north
            };

        });

        navigator.geolocation.getCurrentPosition(
            function (loc) {
                console.log(JSON.stringify(loc));
            }, function (err) {
                console.error('geo error');
                console.log(JSON.stringify(err));
            }
        );
    });
    
    
});