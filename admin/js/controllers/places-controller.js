angular.module('dropinAdmin').controller('PlacesController', function($scope, DropinService){
   
    var map, markers = {};

    $scope.$on('MAP_LOADED', function (e, _map) {
        map = _map;
        $scope.map = map;

        map.addListener('idle', function () {

            var bounds = map.getBounds().toJSON();
            var query = {
                xmin: bounds.west,
                xmax: bounds.east,
                ymin: bounds.south,
                ymax: bounds.north
            };
            
            DropinService.getPlacesIn(query).then(function(response){
                updateMarkers(response);
            });

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


    function updateMarkers(places) {

        var new_ids = places.map(function (place) {
            return "" + place._id;
        });

        var marked_ids = [];
        var delete_count = 0;

        for (var id in markers) {
            var index = new_ids.indexOf(id);

            if (index == -1) {
                var marker = markers[id];
                marker.setMap(null);
                delete markers[id];
                delete_count++;
            } else {
                marked_ids.push(id);
            }
        }

        places.forEach(function (place) {
            addMarker(place);
        })
    }

    function addMarker(place) {

        if (markers[place._id]) {
            return;
        }

        var myLatLng = {
            lat: place.geometry.coordinates[0],
            lng: place.geometry.coordinates[1]
        };

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
//            icon: PaletteService.getMapPinForPlace(place),
            title: 'Hello World!'
        });

        marker.addListener('click', function () {
            $rootScope.viewPlace(place);
        });

        markers[place._id] = marker;
    }

});