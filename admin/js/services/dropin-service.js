angular.module('dropinAdmin').factory('DropinService', function($q, $http){
    
    var API_URL = "https://the-dropin.herokuapp.com";
    var API_PREFIX = "/api/v1";
    
    function getPlaces() {
        
        return $http.get(API_URL+API_PREFIX+'/places');
        
    }
        
    function getPlacesIn(bounds) {

        var def = $q.defer();

        $http.get(API_URL+API_PREFIX+"/places",{ 
            params: bounds
        })
            .then(function(res){
                def.resolve(res.data.content);
            })
            .catch(function(err){
                console.error(err);
            });
        
        return def.promise;
    }
    
    function authenticate(user) {
        
        return $http.post(API_URL+API_PREFIX+'/authenticate', user)
            .then(function(response){
                console.log(response);
                $http.defaults.headers.common.Authorization = response.data.token;
            })
            .catch(function(err){
                console.error(err);
            });
    }
    
    function signup(user) {
        
        return $http.post(API_URL+API_PREFIX+'/signup', user)
            .then(function(response){
                console.log(response);
            })
            .catch(function(err){
                console.error(err);
            });
    }
    
    return {
        authenticate: authenticate,
        signup: signup,
        logout: function() {
            delete $http.defaults.headers.common.Authorization;
        },
        getPlaces: getPlaces,
        getPlacesIn: getPlacesIn
    };
})