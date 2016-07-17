'use strict';

angular.module('app').factory('LikesService', function ($resource) {
    return $resource('api/likes/', {}, {
        get: {method: 'GET', url: 'api/likes/get', isArray: true},
        add: {method: 'POST', url: 'api/likes/add/:id'},
        remove: {method: 'DELETE', url: 'api/likes/remove/:id'}
    });
});