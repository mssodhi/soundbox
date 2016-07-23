'use strict';

angular.module('app').factory('ChartsService', function ($resource) {
    return $resource('api/charts/', {}, {
        get: {method: 'GET', url: 'api/charts/get'}
    });
});