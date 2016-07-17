'use strict';

angular.module('app').controller('LandingCtrl', function (PlaylistService, favorites) {
    var ctrl = this;

    ctrl.init = function () {
        getPlaylists();
        getFavorites();
    };

    function getPlaylists() {
        PlaylistService.getPlaylists().$promise.then(function (response) {
            ctrl.playlists = response;
        });
    }

    function getFavorites() {
        ctrl.tracks = [];
        ctrl.favorites = [];
        for(var i = 0; i < favorites.length; i++){
            SC.get('/users/' + favorites[i].artist_id).then(function(artist){
                ctrl.favorites.push(artist);
            });
            SC.get('/tracks', {user_id: favorites[i].artist_id}).then(function (tracks) {
                for(var i = 0; i < tracks.length; i++){
                    ctrl.tracks.push(tracks[i]);
                }
                ctrl.tracks = _.shuffle(ctrl.tracks);
            });
        }
    }

});