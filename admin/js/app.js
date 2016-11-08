angular.module('dropinAdmin', ['ui.router', 'DropinService', 'MapStylesService'])

.run(function($state, googleMapsLoader, DropinService){

    var SERVER_URL = "https://the-dropin.herokuapp.com";
    DropinService.setUrl(SERVER_URL);

    googleMapsLoader.init("AIzaSyBaHHU9b4tqifwDu9EAKdwpgAERrWNmZas");

})
.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/login.html'
        })
        .state('places', {
            url: '/places',
            templateUrl: 'templates/places.html',
            controller: 'PlacesController'
        })
        .state('place-edit', {
            url: '/place-edit',
            templateUrl: 'templates/place-edit.html',
            controller: 'PlaceEditController',
            params: {
                place: null
            }
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: 'AccountController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'AccountController'
        });

    $urlRouterProvider.otherwise("/login");
});
