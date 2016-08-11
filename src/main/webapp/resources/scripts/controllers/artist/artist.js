'use strict';

angular.module('app').controller('ArtistCtrl', function ($http, profile, $routeParams, FavoritesService, PlaylistService, UserService) {

    var ctrl = this;
    ctrl.currentUser = profile;
    ctrl.init = function () {
        ctrl.q = '';
        validateArtist();
        getPlaylists();
        getFavorites();
    };

    function validateArtist () {
        ctrl.artistNotFound = true;
        UserService.getArtist({username: $routeParams.permalink}).$promise.then(function (artist) {
            if(artist.id){
                ctrl.artist = artist;
                ctrl.artistNotFound = false;
                getTracks(artist);
            }
        })
    }

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

    function getTracks (artist) {
        UserService.getMusicByUser({id: artist.fb_id}).$promise.then(function (tracks) {
            console.log(tracks);
            ctrl.tracks = tracks;
        })
    }

    /* ********************************************************** */
    /*                   Favorites List functions                 */
    /* ********************************************************** */

    ctrl.addFavorite = function(artist){
        FavoritesService.addFavorite({id: ctrl.currentUser.fb_id}, artist.id);
        ctrl.favorites.push(artist);
    };

    ctrl.removeFavorite = function (artist) {
        FavoritesService.removeFavorites({id: ctrl.currentUser.fb_id}, artist.id).$promise.then(function(){
            var index = ctrl.favorites.indexOf(artist);
            ctrl.favorites.splice(index, 1);
        });
    };

    ctrl.isFavorite = function (artist) {
        if(ctrl.favorites.length > 0){
            return _.some(ctrl.favorites, {id: artist.id});
        }else{
            return false;
        }
    };
});