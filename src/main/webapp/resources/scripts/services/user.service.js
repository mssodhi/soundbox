'use strict';

angular.module('app').factory('UserService', function ($resource) {
    return $resource('api/user/', {},  {
        getCurrentUser: {method: 'GET', url: 'api/user/getCurrent'},
        update: {method: 'PUT', url: 'api/user/update'},
        setPic: {method: 'POST', url: 'api/user/pic/user/:id'},
        getArtist: {method: 'GET', url: 'api/user/getArtist/:username/user/:id'}
    });
});