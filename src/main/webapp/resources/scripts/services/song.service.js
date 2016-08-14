'use strict';

angular.module('app').factory('SongService', function ($resource) {
    return $resource('api/song/', {},  {
        getSongContent: {method: 'GET', url: 'api/song/:id/getSongContent'},
        save: {method: 'POST', url: 'api/song/save/user/:id'}
    });
});