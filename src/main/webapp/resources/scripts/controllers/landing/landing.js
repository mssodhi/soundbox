'use strict';

angular.module('app').controller('LandingCtrl', function (profile, PlaylistService, FollowService, UserService) {
    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.init = function () {
        ctrl.loading = true;
        UserService.getMusicByUser({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
            if(response.length !== ctrl.currentUser.songs_length){
                ctrl.errorGettingAll = true;
            }
            ctrl.tracks = response;
            ctrl.loading = false;
        });

        getPlaylists();
        getFollowing();
    };

    function getPlaylists() {
        PlaylistService.getPlaylists({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
            ctrl.playlists = response;
        });
    }

    function getFollowing() {
        FollowService.getFollowing({id: ctrl.currentUser.fb_id}).$promise.then(function (res) {
            ctrl.following = res;
        });
    }

});