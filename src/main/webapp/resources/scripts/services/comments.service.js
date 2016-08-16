'use strict';

angular.module('app').factory('CommentsService', function ($resource) {
    return $resource('api/comments/', {}, {
        getComments: {method: 'GET', url: 'api/comments/song/:id', isArray: true},
        postComment: {method: 'POST', url: 'api/comments/song/:id'}
    });
});