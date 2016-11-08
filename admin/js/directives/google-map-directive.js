angular.module('dropinAdmin').directive("googleMap", function ($rootScope, $compile, googleMapsLoader, MapStylesService) {

    var $scope, map;

    function initialize(element, attrs, coords) {

        console.log('initialize googleMap');

        var myLatlng;
        if (coords) {
            myLatlng = new google.maps.LatLng(coords.latitude, coords.longitude);
        }
        
        var mapOptions = {
            disableDefaultUI: true,
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: MapStylesService
        };
        map = new google.maps.Map(element[0], mapOptions);

        $scope.$emit('MAP_LOADED', map);

        $scope.map = map;
    }

    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'js/directives/google-map-directive.html',
        scope: {
            data: '=',
            merchants: '=',
            onClick: '&'
        },
        link: function (scope, element, attrs) {
console.log('link map')
            $scope = scope;

            var defaultPosition = {
                latitude: 44 + (59 / 60),
                longitude: -93 - (16 / 60)
            };
/*            
            $ionicPlatform.ready(function(){
                if (device.isVirtual) {
                    initialize(element, attrs, defaultPosition);                    
                }
            })
*/

            googleMapsLoader.mapsApiPromise.then(
                function () {

                    initialize(element, attrs, defaultPosition);
                
                    console.log('mapsApiPromise.then');
                    
                    if (navigator.geolocation) {
                        console.log('navigator.geolocation');

                        navigator.geolocation.getCurrentPosition(
                            function (resp) {
                                console.log('got geolocation');
                                initialize(element, attrs, resp.coords);
                            },
                            function (err) {
                                console.log('error getting geolocation!');
                            },
                            { timeout: 5000, enableHighAccuracy: true }
                        );

                    }
                },
                function (err) {
                    console.log("err");
                    console.log(err);
                    initialize(element, attrs, defaultPosition);
                });

//            initialize(element, attrs);
        }
    };

});