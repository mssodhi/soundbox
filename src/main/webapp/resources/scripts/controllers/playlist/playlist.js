'use strict';

angular.module('app').controller('PlaylistCtrl', function ($http, profile, PlaylistService, FavoritesService, playlist) {

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
            for(var i = 0; i < ctrl.currentPlaylist.playlistSongs.length; i++){
                var song = ctrl.currentPlaylist.playlistSongs[i].song;
                ctrl.tracks.push(song);
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
        FavoritesService.getFavorites({id: ctrl.currentUser.fb_id}).$promise.then(function (favorites) {
            for(var i = 0; i < favorites.length; i++){
                SC.get('/users/' + favorites[i].artist_id).then(function(artist){
                    ctrl.favorites.push(artist);
                });
            }
        });
    }

});