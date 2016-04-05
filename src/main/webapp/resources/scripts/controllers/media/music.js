'use strict';

angular.module('app').controller('MusicCtrl', ['$http', 'MediaService', 'FavoritesService', 'profile', 'MusicService', function ($http, MediaService, FavoritesService, profile, MusicService) {
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
                    SC.get('/tracks', {user_id: response.id, limit: 500}).then(function (response) {
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
        SC.get('/tracks', {user_id: ctrl.artist.permalink, limit: 500}).then(function (response) {
            if(response.length == 0){
                $http.get('http://api.soundcloud.com/tracks', {
                        params: {
                            client_id: '0f7c969c815f51078c1de513f666ecdb',
                            q: ctrl.artist.permalink
                        }
                    }).success( function (data) {
                        ctrl.tracks = _.sortBy(data, 'playback_count').reverse();
                });
            }else{
                ctrl.tracks = _.sortBy(response, 'playback_count').reverse();
            }
            ctrl.showInitList = false;
        });
    };

    ctrl.isFavorite = function (artist) {
        for(var i = 0; i < ctrl.favorites.length; i++){
            if(ctrl.favorites[i].id == artist.id){
                return true;
            }
        }
        return false;
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
        SC.get('/users/', {q: ctrl.search, limit: 10}).then(function (response) {
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