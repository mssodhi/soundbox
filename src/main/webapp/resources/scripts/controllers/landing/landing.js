'use strict';

angular.module('app').controller('LandingCtrl', function (profile, PlaylistService, FavoritesService, UserService, $sce) {
    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.init = function () {
        UserService.getMusicByUser({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
            console.log(response);
            ctrl.tracks = response;
            ctrl.tracks.forEach(function (tr) {
                tr.artwork_url = null;
                if(tr.artwork){
                    var int8Array = new Uint8Array(tr.artwork.blob);
                    var blob = new Blob([int8Array], {type: "image/jpeg"});
                    tr.artwork_url = $sce.trustAsResourceUrl(window.URL.createObjectURL(blob))
                }
            })
        });

        // getPlaylists();
        // getFavorites();
    };

    function getPlaylists() {
        PlaylistService.getPlaylists({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
            ctrl.playlists = response;
        });
    }

    function getFavorites() {
        ctrl.tracks = [];
        ctrl.favorites = [];
        FavoritesService.getFavorites({id: ctrl.currentUser.fb_id}).$promise.then(function (favorites) {
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
        });
    }

});