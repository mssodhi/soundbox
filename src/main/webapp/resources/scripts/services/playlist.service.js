'use strict';

angular.module('app').factory('PlaylistService', function ($resource) {
    return $resource('api/playlist/', {}, {
        
        getPlaylists: {method: 'GET', url: 'api/playlist/getPlaylist', isArray: true},
        addPlaylist: {method: 'GET', url: 'api/playlist/addPlaylist/:name'},
        removePlaylist: {method: 'POST', url: 'api/playlist/removePlaylist'}

    });
});