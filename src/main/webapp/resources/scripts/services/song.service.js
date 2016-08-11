'use strict';

angular.module('app').factory('SongService', function ($resource) {
    return $resource('api/song/', {},  {
        getSongContent: {method: 'GET', url: 'api/song/getSongContent/song/:id'},
        save: {method: 'PUT', url: 'api/song/save/user/:id'}
    });
});