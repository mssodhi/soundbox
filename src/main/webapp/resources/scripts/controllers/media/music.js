'use strict';

angular.module('app').controller('MusicCtrl', ['MediaService', 'FavoritesService', 'profile', 'MusicService', function (MediaService, FavoritesService, profile, MusicService) {
    var ctrl = this;
    ctrl.currentUser = profile;
    ctrl.tracks = [];
    ctrl.artists = [];
    ctrl.favorites = [];

    ctrl.init = function () {
        MediaService.getSoundCloudCredentials().$promise.then(function (response) {
            SC.initialize({
                client_id: response.id,
                secret_token: response.secret,
                redirect_uri: 'http://localhost:8080/test/#/'
            });
        });
        ctrl.showArtists = false;
        ctrl.getFavorites();
    };

    ctrl.getFavorites = function(){
        FavoritesService.getFavorites({email: ctrl.currentUser.email}).$promise.then(function (response) {
            ctrl.favorites = [];
            ctrl.tracks = [];
            for(var i = 0; i < response.length; i++){
                SC.get('/users/' + response[i].artist_id).then(function(response){
                    ctrl.favorites.push(response);
                    SC.get('/users/' + response.id + '/tracks').then(function (response) {
                        ctrl.showInitList = true;
                        for(var i = 0; i < response.length; i++){
                            ctrl.tracks.push(response[i]);
                        }
                        ctrl.tracks = _.shuffle(ctrl.tracks);
                    });
                });
            }
        })
    };

    ctrl.getTracks = function () {
        SC.get('/users/' + ctrl.artist.id + '/tracks').then(function (response) {
            ctrl.tracks = response;
            ctrl.showInitList = false;
        });
    };

    ctrl.setArtist = function (artist) {
        ctrl.artist = artist;
        ctrl.showArtists = false;
        ctrl.getTracks();
    };

    ctrl.getArtist = function () {
        ctrl.showArtists = true;
        ctrl.artist = null;
        ctrl.tracks = null;
        SC.get('/users/', {q: ctrl.search, limit: 20}).then(function (response) {
            ctrl.artists = response;
        });
    };

    ctrl.select = function (track) {
        SC.stream('/tracks/' + track.id, {autoPlay: true}).then(function (player) {
            MusicService.setPlayer(player, track);
            MusicService.setList(ctrl.tracks);
        });
    };

    ctrl.addFavorite = function(artist){
        FavoritesService.addFavorite({email: ctrl.currentUser.email}, artist.id).$promise.then(function(){
            ctrl.getFavorites();
        });
    };

    ctrl.removeFavorite = function(artist){
        FavoritesService.removeFavorites({email: ctrl.currentUser.email}, artist.id).$promise.then(function(){
            ctrl.getFavorites();
        });
    };

}]);