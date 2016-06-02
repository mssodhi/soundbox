'use strict';

angular.module('app').factory('FavoritesService', function ($resource) {
    return $resource('api/favorites/', {}, {

        addFavorite: {method: 'PUT', url: 'api/favorites/addFavorite'},
        getFavorites: {method: 'GET', url: 'api/favorites/getList', isArray: true},
        removeFavorites: {method: 'PUT', url: 'api/favorites/removeFavorite'},
        testing: {method: 'PUT', url: 'api/favorites/testing'}

    });
});