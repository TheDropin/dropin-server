angular.module('dropinAdmin').factory('googleMapsLoader', function ($q) {

    var mapsApiDeferred = $q.defer();
    var mapLoaded = false;


    function encodeUrlParams(params) {
        var pairs = [];
        for (var key in params) {
            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        }
        return pairs.join('&');
    }

    function loadMapsApi() {

        if (mapLoaded) {
            mapsApiDeferred.resolve();
            return;
        }

        if (navigator.connection && (navigator.connection.type === Connection.NONE)) {
            console.log("NO NETWORK TO LOAD MAPS");
            return;
        }

        if ((window.google !== undefined) && (window.google.maps)) {
            console.log("will not load - maps already in scope");
            mapsApiDeferred.resolve();
            return;
        }

        if (key == null) {
            console.error("key required for google maps loader service");
            return;
        }

        var params = {
            key: key,
            sensor: true,
            callback: 'onMapsApiLoaded'
        }

        var url = 'https://maps.googleapis.com/maps/api/js';

        jQuery.getScript(url + '?' + encodeUrlParams(params)).then(
            function () {
                console.log("google maps js loaded");
                mapsApiDeferred.resolve();
            },
            function (err) {
                console.error("google maps js load error");
                console.log(JSON.stringify(err));
            }
        );
    }

    window.onMapsApiLoaded = function () {
        console.log("onMapsApiLoaded()")
        mapLoaded = true;
    };


    var key;

    return {
        init: function (_key) {

            key = _key;

            //            document.addEventListener("deviceready", onDeviceReady, false);
            loadMapsApi();

            return mapsApiDeferred.promise;
        },
        mapsApiPromise: mapsApiDeferred.promise,
        loadMapsApi: loadMapsApi
    }
});