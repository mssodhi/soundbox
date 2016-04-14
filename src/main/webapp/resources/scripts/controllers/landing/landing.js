'use strict';

angular.module('app').controller('LandingCtrl', ['$location', 'CredentialsService', 'profile', 'FavoritesService', function ($location, CredentialsService, profile, FavoritesService) {
    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.init = function () {

        CredentialsService.getSoundCloudCredentials().$promise.then(function (response) {
            SC.initialize({
                client_id: response.id,
                secret_token: response.secret,
                redirect_uri: 'http://localhost:8080/test/#/'
            });
        });

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

}]);