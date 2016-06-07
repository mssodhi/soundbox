'use strict';

angular.module('app').directive('musicPlayer', function() {
    return{
        templateUrl: 'resources/scripts/controllers/music-player/music-player.html',
        controller: 'MusicPlayerCtrl',
        controllerAs: 'ctrl'
    };
});