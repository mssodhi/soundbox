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
        ctrl.tracks = [];
        if(ctrl.currentPlaylist.id){
            for(var i = 0; i < ctrl.currentPlaylist.playlistSongs.length; i++){
                var song = ctrl.currentPlaylist.playlistSongs[i].song;
                ctrl.tracks.push(song);
            }
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
            ctrl.currentUser.following = res;
        });
    }

});