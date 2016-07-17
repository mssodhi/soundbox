'use strict';

angular.module('app').factory('RecommendService', function ($resource) {
    return $resource('api/recommend/', {}, {
        get: {method: 'GET', url: 'api/recommend/get'}
    });
});