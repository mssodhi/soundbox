'use strict';

angular.module('app').factory('FollowService', function ($resource) {
    return $resource('api/favorites/', {}, {
        follow: {method: 'PUT', url: 'api/follow/user/:id'},
        getFollowing: {method: 'GET', url: 'api/follow/getFollowing/user/:id', isArray: true},
        getFollowers: {method: 'GET', url: 'api/follow/getFollowers/user/:id', isArray: true}
    });
});