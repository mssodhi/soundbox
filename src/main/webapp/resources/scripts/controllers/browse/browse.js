'use strict';

angular.module('app').controller('BrowseCtrl', function ($http, recommendation, favorites, $location, PlaylistService, FavoritesService) {
    var ctrl = this;
    ctrl.tracks = [];
    var limit = 15;
    ctrl.artist_grid = true;
    ctrl.pl_grid = true;

    ctrl.init = function () {
        getPlaylists();
        getFavorites();
        getRecommendations();
    };

    function getRecommendations() {
        for(var i = 0; i < recommendation.length; i++){
            SC.get('/search/', {q: recommendation[i], limit: 20}).then(function (res) {
                // three objs from each collection
                var y = 0;
                for(var a = 0; (a === res.collection.length || y < 1 )&& ctrl.tracks.length < limit; a++){
                    var obj = res.collection[a];
                    if(obj.kind === 'track'){
                        if(!_.some(ctrl.tracks, obj)){
                            ctrl.tracks.push(obj);
                            y++;
                        }
                    }
                }
            });
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

    ctrl.goToArtist = function (artist) {
        $location.path('artist/'+ artist.permalink);
    };

    ctrl.clickSearch = function () {
        var search = document.getElementById("search");
        search.focus();
    };

    ctrl.deleteFavorite = function (artist) {
        FavoritesService.removeFavorites({}, artist.id).$promise.then(function(){
            var index = ctrl.favorites.indexOf(artist);
            ctrl.favorites.splice(index, 1);
        });
    };

    ctrl.deletePlaylist = function (playlist) {
        PlaylistService.removePlaylist(playlist).$promise.then(function () {
            ctrl.playlists.splice(ctrl.playlists.indexOf(playlist), 1);
        });
    };

    ctrl.addPlaylist = function () {
        if(ctrl.name.length > 0){
            PlaylistService.addPlaylist({name: ctrl.name}).$promise.then(function (res) {
                if(res.id){
                    ctrl.playlists.push(res);
                    ctrl.showForm = false
                }
                ctrl.name = '';
            });
        }

    };

    ctrl.goToPlaylist = function (playlist) {
        $location.path('playlist/' + playlist.id);
    };

});