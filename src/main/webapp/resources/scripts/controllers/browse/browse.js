'use strict';

angular.module('app').controller('BrowseCtrl', function (profile, favorites, $location, PlaylistService, FavoritesService, RecommendService) {
    var ctrl = this;
    ctrl.currentUser = profile;
    // ctrl.recommendations = [];
    ctrl.tracks = [];
    var tracks_limit = 10;
    // search response limit
    var limit = 5;

    ctrl.init = function () {
        getPlaylists();
        getFavorites();
        RecommendService.get().$promise.then(function (response) {
            // ctrl.recommendations = response;
            for(var i = 0; i < response.length; i++){
                SC.get('/search/', {q: response[i], limit: 10}).then(function (res) {
                    if(res.collection.length < limit){
                        limit = res.collection.length;
                    }
                    for(var a = 0; a < limit && ctrl.tracks.length < tracks_limit; a++){
                        var obj = res.collection[a];
                        if(obj.kind === 'track'){
                            if(!_.some(ctrl.tracks, obj)){
                                ctrl.tracks.push(obj);
                            }
                        }
                    }
                });
            }
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