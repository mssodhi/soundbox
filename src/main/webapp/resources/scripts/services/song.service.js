'use strict';

angular.module('app').factory('SongService', function ($resource) {
    return $resource('api/song/', {},  {
        save: {method: 'POST', url: 'api/song/save/user/:id'},
        updatePlaysCount: {method: 'PUT', url: 'api/song/:id/update'}
    });
});