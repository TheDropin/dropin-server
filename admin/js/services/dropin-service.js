angular.module('dropinAdmin').factory('DropinService', function($http){
    
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
        signup: signup
    };
})