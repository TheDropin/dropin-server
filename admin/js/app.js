angular.module('dropinAdmin', ['ui.bootstrap', 'ui.router'])

.run(function($state){
})
.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/login.html'
        })
        .state('login', {
            url: '/',
            templateUrl: 'templates/login.html'
        });

    $urlRouterProvider.otherwise("/");
});
