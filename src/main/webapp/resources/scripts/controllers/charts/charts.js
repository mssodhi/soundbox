'use strict';

angular.module('app').controller('ChartsCtrl', function (ChartsService, MusicService, PlaylistService) {
    var ctrl = this;
    ctrl.tracks = [];

    ctrl.grid = false;
    ctrl.init = function () {
        getPopular();
        getPlaylists();
    };

    function getPopular() {
        ChartsService.get().$promise.then(function (res) {
            res.collection.forEach(function (song) {
                ctrl.tracks.push(song.track);
            })
        });
    }

    function getPlaylists() {
        PlaylistService.getPlaylists().$promise.then(function (response) {
            ctrl.playlists = response;
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