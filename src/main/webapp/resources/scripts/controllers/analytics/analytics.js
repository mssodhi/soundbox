'use strict';

angular.module('app').controller('AnalyticsCtrl', function (profile, PlaylistService, FollowService) {
    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.init = function () {
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