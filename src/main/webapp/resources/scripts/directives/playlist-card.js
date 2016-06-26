'use strict';

angular.module('app').component('playlistCard', {
    templateUrl: 'resources/scripts/controllers/common/playlist/playlist-card.html',
    controller: 'PlaylistCardCtrl',
    controllerAs: 'ctrl',
    bindings: {
        list: '='
    }
});

angular.module('app').controller('PlaylistCardCtrl', function (PlaylistService, $location) {

    var ctrl = this;

    ctrl.focus = function (e) {
        e.target.focus();
    };

    ctrl.addPlaylist = function (name) {
        PlaylistService.addPlaylist({name: name}).$promise.then(function (res) {
            if(res.id){
                ctrl.list.push(res);
            }
            name = undefined;
        });

    };

    ctrl.removePlaylist = function (playlist) {
        PlaylistService.removePlaylist(playlist).$promise.then(function () {
            ctrl.list.splice(ctrl.list.indexOf(playlist), 1);
        });
    };

    ctrl.showPlaylist = function (playlist) {
        $location.path('playlist/' + playlist.id);
    };

});