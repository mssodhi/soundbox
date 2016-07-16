'use strict';

angular.module('app').controller('FavoritesCtrl', function (profile, favorites, $location) {
    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.init = function () {
        getFavorites();
    };

    ctrl.goToArtist = function (artist) {
        // console.log(artist)
        $location.path('/artist/'+ artist.permalink);
    };

    function getFavorites() {
        ctrl.favorites = [];
        for(var i = 0; i < favorites.length; i++){
            SC.get('/users/' + favorites[i].artist_id).then(function(artist){
                ctrl.favorites.push(artist);
            });
        }
    }

});