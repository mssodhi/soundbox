'use strict';

angular.module('app').factory('FavoritesService', function ($resource) {
    return $resource('api/favorites/', {}, {
        addFavorite: {method: 'PUT', url: 'api/favorites/addFavorite/user/:id'},
        getFavorites: {method: 'GET', url: 'api/favorites/getFavorites/user/:id', isArray: true},
        removeFavorites: {method: 'PUT', url: 'api/favorites/removeFavorite/user/:id'}
    });
});