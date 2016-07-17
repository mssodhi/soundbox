'use strict';

angular.module('app').controller('BrowseCtrl', function (profile, favorites, $location, PlaylistService, FavoritesService, RecommendService) {
    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.init = function () {
        getPlaylists();
        getFavorites();
        RecommendService.get().$promise.then(function () {

        });
    };

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