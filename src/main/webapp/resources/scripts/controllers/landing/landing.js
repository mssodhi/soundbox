'use strict';

angular.module('app').controller('LandingCtrl', function ($location, profile, FavoritesService) {
    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.init = function () {
        //ctrl.hit();
        ctrl.getFavorites();

    };

    ctrl.getFavorites = function(){
        FavoritesService.getFavorites({email: ctrl.currentUser.email}).$promise.then(function (response) {
            ctrl.favorites = [];
            ctrl.tracks = [];
            for(var i = 0; i < response.length; i++){
                SC.get('/users/' + response[i].artist_id).then(function(response){
                    ctrl.favorites.push(response);
                    //console.log(response);
                });
            }
        })
    };

    ctrl.goToMusic = function(){
        $location.path('/music');
    };
    
    ctrl.hit = function () {
        FavoritesService.testing().$promise.then(function (response) {
            console.log(response);
        });
    }

});