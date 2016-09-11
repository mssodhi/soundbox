'use strict';

angular.module('app').factory('SongService', function ($resource) {
    return $resource('api/song/', {},  {
        save: {method: 'POST', url: 'api/song/save/user/:id'},
        updatePlaysCount: {method: 'PUT', url: 'api/song/:id/update'},
        saveLyrics: {method: 'PUT', url: 'api/song/lyrics/save'},
        getLyrics: {method: 'GET', url: 'api/song/:id/lyrics'},
        deleteSong: {method: 'POST', url: 'api/song/:id/delete'},
        getMusicByUser: {method: 'POST', url: 'api/song/getMusicByUser/:fbId', isArray: true}
    });
});