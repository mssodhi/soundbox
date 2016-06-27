'use strict';

angular.module('app').controller('LandingCtrl', function (MusicService, PlaylistService, favorites) {
    var ctrl = this;
    
    var limit = null;
    ctrl.init = function () {
        ctrl.showInitList = true;
        ctrl.q = '';
        getPlaylists();
        getFavorites();
    };

    function getPlaylists() {
        PlaylistService.getPlaylists().$promise.then(function (response) {
            ctrl.playlists = response;
        });
    }

    function getFavorites() {

        if(favorites.length < 10){
            limit = 20
        }else if(favorites.length > 50){
            limit = 10;
        }else{
            limit = 15;
        }

        ctrl.tracks = [];
        ctrl.favorites = [];
        for(var i = 0; i < favorites.length; i++){
            SC.get('/users/' + favorites[i].artist_id).then(function(artist){
                ctrl.favorites.push(artist);
            });
            SC.get('/tracks', {user_id: favorites[i].artist_id, limit: limit}).then(function (tracks) {
                for(var i = 0; i < tracks.length; i++){
                    ctrl.tracks.push(tracks[i]);
                }
                ctrl.tracks = _.shuffle(ctrl.tracks);
            });
        }
    }

    /* ********************************************************** */
    /*                   Playlist functions                       */
    /* ********************************************************** */

    ctrl.addSongToPlaylist = function (song, playlist) {
        var duplicate = null;
        for(var i = 0; i < playlist.songs.length; i++){
            if(parseInt(playlist.songs[i].track_id) === parseInt(song.id)){
                duplicate = true;
                break;
            }
        }
        if(!duplicate) {
            PlaylistService.addSongToPlaylist({songId: song.id}, playlist);
        }
    };
});