'use strict';

angular.module('app').controller('ChartsCtrl', function (ChartsService, MusicService) {
    var ctrl = this;
    ctrl.tracks = [];

    ctrl.grid = true;
    ctrl.init = function () {
        getPopular();
    };

    function getPopular() {
        ChartsService.get().$promise.then(function (res) {
            res.collection.forEach(function (song) {
                ctrl.tracks.push(song.track);
            })
        });
    }

    ctrl.select = function (track) {
        if(!ctrl.isPlaying(track)){
            SC.stream('/tracks/' + track.id, {autoPlay: false}).then(function (player) {
                player.seek(0);
                player.on('finish', function () {
                    player.seek(0);
                    ctrl.select(MusicService.getNext());
                });
                MusicService.setPlayer(player, track);
                MusicService.setList(ctrl.tracks);
            });
        }
    };

    ctrl.isPlaying = function (track) {
        var playing = MusicService.getTrack();
        if (playing) {
            if (playing.id === track.id) {
                return true;
            }
        }
    };

});