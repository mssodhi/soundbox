'use strict';

angular.module('app').factory('ChartsService', function ($resource) {
    return $resource('api/charts/', {}, {
        getByGenre: {method: 'PUT', url: 'api/charts/getByGenre'},
        getGenres: {method: 'GET', url: 'api/charts/getGenres', isArray: true}
    });
});