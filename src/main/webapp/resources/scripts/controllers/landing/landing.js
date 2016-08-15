'use strict';

angular.module('app').controller('LandingCtrl', function (profile, PlaylistService, FollowService, UserService) {
    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.init = function () {
        ctrl.tracks = [];
        getMusicByUser(ctrl.currentUser);
        getPlaylists();
        getFollowing();
    };

    function getPlaylists() {
        PlaylistService.getPlaylists({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
            ctrl.playlists = response;
        });
    }

    function getMusicByUser(user) {
        UserService.getMusicByUser({id: user.fb_id}).$promise.then(function (response) {
            response.map(function (track) {
                ctrl.tracks.push(track);
            });
        });
    }

    function getFollowing() {
        FollowService.getFollowing({id: ctrl.currentUser.fb_id}).$promise.then(function (res) {
            ctrl.following = res;
            res.map(getMusicByUser);
        });
    }

});