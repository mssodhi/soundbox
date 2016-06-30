'use strict';

angular.module('app').factory('LoginService', function ($resource) {
    return $resource('api/login/', {},  {
        checkEmailAvailability: {method: 'GET', url: 'api/login/checkAvailability/:email'},
        addUser: {method: 'PUT', url: 'api/login/addUser'},
        login: {method: 'PUT', url: 'api/login/user/:email'},
        logout: {method: 'GET', url: 'api/login/logout'},
        verifyUser: {method: 'GET', url: 'api/login/verify/:secret'}
    });
});