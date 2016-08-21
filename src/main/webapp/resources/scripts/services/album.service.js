'use strict';

angular.module('app').factory('AlbumService', function ($resource) {
    return $resource('api/album/', {}, {
        create: {method: 'GET', url: 'api/album/create/:name/user/:id'},
        addSong: {method: 'GET', url: 'api/album/:id/addSong/:songId'}
    });
});