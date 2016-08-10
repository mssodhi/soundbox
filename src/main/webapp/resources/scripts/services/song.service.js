'use strict';

angular.module('app').factory('SongService', function ($resource) {
    return $resource('api/user/', {},  {
        getSong: {method: 'GET', url: 'api/song/getSong/:id'}
    });
});