'use strict';

angular.module('app').directive('playlistCard', function() {
    return {
        templateUrl: 'resources/scripts/controllers/common/playlist/playlist-card.html'
    };
});

angular.module('app').controller('PlaylistCardCtrl', function (PlaylistService, $location) {

    var ctrl = this;
    PlaylistService.getPlaylists().$promise.then(function (response) {
        ctrl.playlists = response;
    });

    ctrl.focus = function (e) {
        e.target.focus();
    };

    ctrl.addPlaylist = function (name) {
        PlaylistService.addPlaylist({name: name}).$promise.then(function (res) {
            if(res.id){
                ctrl.playlists.push(res);
            }
            name = undefined;
        });

    };

    ctrl.removePlaylist = function (playlist) {
        PlaylistService.removePlaylist(playlist).$promise.then(function (response) {
            ctrl.playlists.splice(ctrl.playlists.indexOf(playlist), 1);
        });
    };

    ctrl.showPlaylist = function (playlist) {
        $location.path('playlist/' + playlist.id);
    };

});