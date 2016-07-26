'use strict';

angular.module('app').factory('ChartsService', function ($resource) {
    return $resource('api/charts/', {}, {
        getByGenre: {method: 'GET', url: 'api/charts/getByGenre/:name'},
        getGenres: {method: 'GET', url: 'api/charts/getGenres', isArray: true}
    });
});