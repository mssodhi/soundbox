'use strict';

angular.module('app').factory('FollowService', function ($resource) {
    return $resource('api/favorites/', {}, {
        follow: {method: 'PUT', url: 'api/follow/user/:id'},
        getFollowing: {method: 'GET', url: 'api/follow/get/user/:id', isArray: true}
    });
});