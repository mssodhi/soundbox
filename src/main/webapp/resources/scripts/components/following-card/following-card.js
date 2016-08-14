'use strict';

angular.module('app').component("followingCard", {
    templateUrl: 'resources/scripts/components/following-card/following-card.html',
    controllerAs: 'ctrl',
    controller: function (FollowService, $location, UserService) {
        var ctrl = this;
        ctrl.init = function () {
            UserService.getCurrentUser().$promise.then(function (res) {
                ctrl.currentUser = res;
            })
        };

        ctrl.goToArtist = function (artist) {
            $location.path('/artist/'+ artist.username);
        };

        ctrl.unfollow = function(artist){
            FollowService.follow({id: ctrl.currentUser.fb_id}, artist.fb_id).$promise.then(function () {
                var index = _.findIndex(ctrl.following, function (following) {
                    return following.fb_id === artist.fb_id;
                });
                ctrl.following.splice(index, 1);
            });
        };

        ctrl.goToBrowse = function () {
            $location.path('/browse');
        };
    },
    bindings: {
        following: '='
    }
});