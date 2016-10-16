angular.module('dropinAdmin').controller('PlacesController', function($scope, DropinService){
   
    var map, markers = {};

    $scope.$on('MAP_LOADED', function (e, _map) {
        map = _map;
        $scope.map = map;

        map.addListener('idle', function () {
            console.log('idle');

            var bounds = map.getBounds().toJSON();
            var query = {
                xmin: bounds['west'],
                xmax: bounds.east,
                ymin: bounds.south,
                ymax: bounds.north
            };
            console.log(JSON.stringify(query));
            
            DropinService.getPlaces().then(function(response){
                console.log(response);
            });
/*
            MngisService.getStopsWithinBounds(query,
                function (resp) {
                    //                console.dir(Object.keys(resp));
                    updateMarkers(resp);
                },
                function (err) {
                    console.dir(JSON.stringify(err));
                }
            );
*/
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


    function updateMarkers(stops) {

        var new_siteids = stops.map(function (stop) {
            return "" + stop.attributes.siteid;
        });

        var marked_siteids = [];
        var delete_count = 0;

        for (var siteid in markers) {
            var index = new_siteids.indexOf(siteid);

            if (index == -1) {
                var marker = markers[siteid];
                marker.setMap(null);
                delete markers[siteid];
                delete_count++;
            } else {
                marked_siteids.push(siteid);
            }
        }

        stops.forEach(function (stop) {
            addMarker(stop);
        })
    }

    function addMarker(place) {

        if (markers[place.attributes.siteid]) {
            return;
        }

        var myLatLng = {
            lat: place.geometry.y,
            lng: place.geometry.x
        };

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: PaletteService.getMapPinForPlace(place),
            title: 'Hello World!'
        });

        marker.addListener('click', function () {
            $rootScope.viewPlace(place);
        });

        markers[place.attributes.siteid] = marker;
    }

});