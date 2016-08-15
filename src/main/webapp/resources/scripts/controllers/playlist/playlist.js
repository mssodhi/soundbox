'use strict';

angular.module('app').controller('PlaylistCtrl', function ($http, profile, PlaylistService, FollowService, playlist) {

    var ctrl = this;
    ctrl.currentUser = profile;
    ctrl.currentPlaylist = playlist;
    ctrl.edit = false;
    ctrl.playlists = [];

    ctrl.init = function () {
        validateAndGetTracks();
        getPlaylists();
        getFollowing();
    };

    function validateAndGetTracks() {
        if(ctrl.currentPlaylist.id){
            ctrl.tracks = ctrl.currentPlaylist.playlistSongs.map(function (obj) {
                return obj.song;
            });
        }
    }

    ctrl.updatePlaylist = function () {
        PlaylistService.updatePlaylist(ctrl.currentPlaylist).$promise.then(function (res) {
            var ind = _.findIndex(ctrl.playlists, {id: ctrl.currentPlaylist.id});
            ctrl.playlists[ind] = res;
            angular.copy(res, ctrl.currentPlaylist);
        });
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