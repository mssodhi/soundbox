'use strict';

angular.module('app').component('playlistCard', {
    templateUrl: 'resources/scripts/components/playlist/playlist-card.html',
    controller: 'PlaylistCardCtrl',
    controllerAs: 'ctrl',
    bindings: {
        list: '='
    }
});

angular.module('app').controller('PlaylistCardCtrl', function ($route, PlaylistService, $location) {

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
        // if deleting the playlist while on the playlist page
        // delete the playlist and to go landing page
        if($location.path().indexOf('/playlist/'+ playlist.id) === 0){
            $location.path('/');
        }
    };

    ctrl.showPlaylist = function (playlist) {
        $location.path('playlist/' + playlist.id);
    };

});