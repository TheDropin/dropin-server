angular.module('dropinAdmin')
    .controller('PlaceEditController', function ($scope, DropinService, $stateParams, $state) {
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
                draggable: true
            });

            $scope.$watch('place.type', function (value) {
                console.log(value);

                var iconUrl = DropinService.placeIcon(place.type);
                placeholder.setIcon(iconUrl);
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

            var pos = placeholder.getPosition().toJSON();
            $scope.place.geometry.coordinates = [pos.lat, pos.lng];
            
            console.log($scope.place);
            
            DropinService.updatePlace($scope.place)
                .then(function(){
                    $state.go('places');
                })
                .catch(alert)
        }

    });