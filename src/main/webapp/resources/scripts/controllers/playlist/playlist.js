'use strict';

angular.module('app').controller('PlaylistCtrl', function ($http, PlaylistService, favorites, playlist) {

    var ctrl = this;
    ctrl.playlist = playlist;
    ctrl.init = function () {
        ctrl.q = '';
        validateAndGetTracks();
        getPlaylists();
        getFavorites();
    };

    function validateAndGetTracks() {
        ctrl.playlistNotFound = false;
        ctrl.tracks = [];
        if(playlist.id){
            for(var j = 0; j < playlist.songs.length; j++){
                $http.get('http://api.soundcloud.com/tracks/' + playlist.songs[j].track_id, {
                    params: {
                        client_id: '0f7c969c815f51078c1de513f666ecdb'
                    }
                }).success( function (data) {
                    ctrl.tracks.push(data);
                });
            }
        }else{
            ctrl.playlistNotFound = true;
            ctrl.playlist = null;
        }
    }

    function getPlaylists() {
        PlaylistService.getPlaylists().$promise.then(function (response) {
            ctrl.playlists = response;
        });
    }

    function getFavorites() {
        ctrl.favorites = [];
        for(var i = 0; i < favorites.length; i++){
            SC.get('/users/' + favorites[i].artist_id).then(function(artist){
                ctrl.favorites.push(artist);
            });
        }
    }

});