'use strict';

angular.module('app').controller('ManageCtrl', function (profile, SongService) {
    var ctrl = this;
    ctrl.currentUser = profile;
    ctrl.tracks = [];

    ctrl.init = function () {
        getTracks(ctrl.currentUser);
    };

    function getTracks (artist) {
        ctrl.loading = true;
        SongService.getMusicByUser({fbId: artist.fb_id}, false).$promise.then(function (tracks) {
            ctrl.tracks = tracks;
            ctrl.loading = false;
        })
    }

    ctrl.deleteSong = function (song) {
        if(song.user.fb_id === ctrl.currentUser.fb_id){
            SongService.deleteSong({id: song.id}, ctrl.currentUser).$promise.then(function (response) {
                if(response.status === 'success'){
                    var index = _.findIndex(ctrl.tracks, function (track) {
                        return track.id === song.id;
                    });
                    ctrl.tracks.splice(index, 1);
                }
            })
        }
    };
});