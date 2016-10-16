angular.module('dropinAdmin', ['ui.bootstrap', 'ui.router'])

.run(function($state, googleMapsLoader){

    googleMapsLoader.init("AIzaSyBaHHU9b4tqifwDu9EAKdwpgAERrWNmZas");

})
.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/login.html'
        })
        .state('places', {
            url: '/',
            templateUrl: 'templates/places.html',
            controller: 'PlacesController'
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
