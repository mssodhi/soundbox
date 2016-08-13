'use strict';

angular.module('app').controller('LandingCtrl', function (profile, PlaylistService, FollowService, UserService) {
    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.init = function () {
        UserService.getMusicByUser({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
            ctrl.tracks = response;
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
            ctrl.currentUser.following = res;
        });
    }

});