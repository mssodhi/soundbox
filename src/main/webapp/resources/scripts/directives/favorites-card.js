'use strict';

angular.module('app').component("favoritesCard", {
    templateUrl: 'resources/scripts/controllers/common/favorites/favorites-card.html',
    controller: 'FavoritesCardCtrl',
    controllerAs: 'ctrl'
});

angular.module('app').controller('FavoritesCardCtrl', function (FavoritesService, $location) {
    var ctrl = this;
    ctrl.favorites = [];
    
    ctrl.init = function () {
        FavoritesService.getFavorites().$promise.then(function (response) {
            for(var i = 0; i < response.length; i++){
                SC.get('/users/' + response[i].artist_id).then(function(artist){
                    ctrl.favorites.push(artist);
                });
            }
        });
    };

    ctrl.goToArtist = function (artist) {
        $location.path('/artist/'+ artist.permalink);
    };

    ctrl.removeFavorite = function(artist){
        FavoritesService.removeFavorites({}, artist.id).$promise.then(function(){
            var index = ctrl.favorites.indexOf(artist);
            ctrl.favorites.splice(index, 1);
        });
    };
});