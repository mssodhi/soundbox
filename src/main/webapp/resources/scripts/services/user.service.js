'use strict';

angular.module('app').factory('UserService', function ($resource) {
    return $resource('api/user/', {},  {
        getCurrentUser: {method: 'GET', url: 'api/user/getCurrent'},
        setPic: {method: 'POST', url: 'api/user/pic/user/:id'}
    });
});