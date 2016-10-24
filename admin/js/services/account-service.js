angular.module('dropinAdmin').factory('AccountService', function($q, $http){
    
    var API_URL = '';
    var API_PREFIX = "/api/v1";

    var token = localStorage.getItem('Account-JWT');
    if (token) {
        $http.defaults.headers.common.Authorization = token;
        localStorage.setItem('Account-JWT', token);
    }


    function authenticate(user) {
        
        return $http.post(API_URL+API_PREFIX+'/authenticate', user)
            .then(function(response){
                console.log(response);
                var token = response.data.token;
                $http.defaults.headers.common.Authorization = token;
                localStorage.setItem('Account-JWT', token);
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
    
    
    return {
        setUrl: function(url) { API_URL = url; },
        authenticate: authenticate,
        signup: signup,
        logout: function() {
            delete $http.defaults.headers.common.Authorization;
        },
        getPlaces: getPlaces,
        getPlacesIn: getPlacesIn
    };
})