'use strict';

angular.module('app').factory('FavoritesService', function ($resource) {
    return $resource('api/favorites/', {}, {

        addFavorite: {method: 'PUT', url: 'api/favorites/addFavorite/:email'},
        getFavorites: {method: 'GET', url: 'api/favorites/getList/:email', isArray: true},
        removeFavorites: {method: 'PUT', url: 'api/favorites/removeFavorite/:email'},
        testing: {method: 'PUT', url: 'api/favorites/testing'}

    });
});