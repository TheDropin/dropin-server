angular.module('dropinAdmin')
    .controller('PlaceEditController', function ($scope, DropinService, $stateParams) {
        console.log('PDC: ' + JSON.stringify($stateParams));

        $scope.place = $stateParams.place;

        var placeholder;

        function addPlaceholderMarker(place) {
            console.log(place);
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

            $scope.$watch('place.type', function (value) {
                console.log(value);

                var iconUrl = DropinService.placeIcon(place.type);
            if (iconUrl) {                
                var image = {
                    url: iconUrl,
                    size: new google.maps.Size(32,32),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(13, 13),
                    scaledSize: new google.maps.Size(25, 25)
                };
                placeholder.setIcon(iconUrl);
            }
            
            });

            return placeholder;
        }

        $scope.$on('MAP_LOADED', function (e, _map) {
            map = _map;
            $scope.map = map;

            placeholder = addPlaceholderMarker($scope.place);
            map.setCenter(placeholder.getPosition());

            placeholder.addListener('dragend', function () {
                map.panTo(placeholder.getPosition());
            });
        });


        $scope.save = function () {
            console.log($scope.place);

            var pos = placeholder.getPosition().toJSON();

            $scope.place.geometry.coordinates = [pos.lat, pos.lng];
        }

    });