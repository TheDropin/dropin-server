angular.module('dropinAdmin').factory('DropinService', function($q, $http){
    
    function getPlaces() {
        
        return $http.get('/api/v1/places');
        
    }
        
    function getPlacesIn(bounds) {

        var def = $q.defer();

        $http.get("/api/v1/places",{ 
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
        
        return $http.post('/api/v1/authenticate', user)
            .then(function(response){
                console.log(response);
                $http.defaults.headers.common.Authorization = response.data.token;
            })
            .catch(function(err){
                console.error(err);
            });
    }
    
    function signup(user) {
        
        return $http.post('/api/v1/signup', user)
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