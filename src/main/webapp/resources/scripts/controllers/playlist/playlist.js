'use strict';

angular.module('app').controller('PlaylistCtrl', function ($http, profile, PlaylistService, favorites, playlist) {

    var ctrl = this;
    ctrl.currentUser = profile;
    ctrl.currentPlaylist = playlist;
    ctrl.edit = false;
    ctrl.playlists = [];

    ctrl.init = function () {
        validateAndGetTracks();
        getPlaylists();
        getFavorites();
    };

    function validateAndGetTracks() {
        ctrl.tracks = [];
        if(ctrl.currentPlaylist.id){
            for(var i = 0; i < ctrl.currentPlaylist.songs.length; i++){
                $http.get('http://api.soundcloud.com/tracks/' + ctrl.currentPlaylist.songs[i].track_id, {
                    params: {
                        client_id: '0f7c969c815f51078c1de513f666ecdb'
                    }
                }).success( function (data) {
                    ctrl.tracks.push(data);
                });
            }
        }
    }

    ctrl.updatePlaylist = function () {
        PlaylistService.updatePlaylist(ctrl.currentPlaylist).$promise.then(function (res) {
            var ind = _.findIndex(ctrl.playlists, {id: ctrl.currentPlaylist.id});
            ctrl.playlists[ind] = res;
            angular.copy(res, ctrl.currentPlaylist);
        });
    };

    function getPlaylists() {
        PlaylistService.getPlaylists({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
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