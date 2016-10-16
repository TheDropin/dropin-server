angular.module('dropinAdmin').factory('DropinService', function($http){
    
    function authenticate(user) {
        
        $http.post('/api/v1/authenticate', user)
            .then(function(response){
                console.log(response);
//    $http.defaults.headers.common.Authorization = token;
            })
            .catch(function(err){
                console.error(err);
            });
    }
    
    function signup(user) {
        
        $http.post('/api/v1/signup', user)
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