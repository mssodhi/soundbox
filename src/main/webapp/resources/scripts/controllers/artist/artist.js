'use strict';

angular.module('app').controller('ArtistCtrl', function ($http, $routeParams, FavoritesService, favorites, PlaylistService) {

    var ctrl = this;

    ctrl.init = function () {
        ctrl.q = '';
        validateArtist();
        getPlaylists();
        getFavorites();
    };

    function validateArtist () {
        ctrl.artistNotFound = false;
        // get tracks by user
        SC.get('/users/' + $routeParams.permalink).then(function(response){
            ctrl.artist = response;
            getTracks(response);
        }).catch(function (error) {
            if(error.status === 404){
                ctrl.artistNotFound = true;
            }
        });
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

    function getTracks (artist) {
        SC.get('/tracks', {user_id: artist.permalink, limit: 500}).then(function (response) {
            if(response.length === 0){
                $http.get('http://api.soundcloud.com/tracks', {
                    params: {
                        client_id: '0f7c969c815f51078c1de513f666ecdb',
                        q: artist.permalink
                    }
                }).success( function (data) {
                    if(data.length === 0){
                        ctrl.tracks = [];
                    }else{
                        ctrl.tracks = _.sortBy(data, 'playback_count').reverse();
                    }
                });
            }else{
                ctrl.tracks = _.sortBy(response, 'playback_count').reverse();
            }
        });
    }

    /* ********************************************************** */
    /*                   Favorites List functions                 */
    /* ********************************************************** */

    ctrl.addFavorite = function(artist){
        FavoritesService.addFavorite({}, artist.id);
        ctrl.favorites.push(artist);
    };

    ctrl.isFavorite = function (artist) {
        return _.some(ctrl.favorites, {id: artist.id});
    };
});