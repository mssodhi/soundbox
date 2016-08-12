'use strict';

angular.module('app').factory('LikesService', function ($resource) {
    return $resource('api/likes/', {}, {
        get: {method: 'GET', url: 'api/likes/get/user/:id', isArray: true},
        toggleLike: {method: 'GET', url: 'api/likes/song/:songId/user/:userId'}
    });
});