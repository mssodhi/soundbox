'use strict';

angular.module('app').component("favoritesCard", {
    templateUrl: 'resources/scripts/components/favorites/favorites-card.html',
    controllerAs: 'ctrl',
    controller: function (FavoritesService, $location, UserService) {
        var ctrl = this;
        ctrl.init = function () {
            UserService.getCurrentUser().$promise.then(function (res) {
                ctrl.currentUser = res;
            })
        };

        ctrl.goToArtist = function (artist) {
            $location.path('/artist/'+ artist.permalink);
        };

        ctrl.removeFavorite = function(artist){
            FavoritesService.removeFavorites({id: ctrl.currentUser.fb_id}, artist.id).$promise.then(function(){
                var index = ctrl.favorites.indexOf(artist);
                ctrl.favorites.splice(index, 1);
            });
        };

        ctrl.goToBrowse = function () {
            $location.path('/browse');
        };
    },
    bindings: {
        favorites: '='
    }
});