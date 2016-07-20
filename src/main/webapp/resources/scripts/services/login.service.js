'use strict';

angular.module('app').factory('LoginService', function ($resource) {
    return $resource('api/login/', {},  {
        logout: {method: 'GET', url: 'api/login/logout'},
        checkUser: {method: 'PUT', url: 'api/login/checkUser/:uid'}
    });
});