'use strict';

angular.module('app').controller('ChartsCtrl', function (ChartsService, MusicService, PlaylistService) {
    var ctrl = this;

    ctrl.genres = [];
    ctrl.grid = true;

    ctrl.init = function () {
        getPlaylists();
        getGenres();
        ctrl.getTop('all-music');
    };

    ctrl.getTop = function (genre) {
        ChartsService.getByGenre({name: genre}).$promise.then(function (res) {
            ctrl.tracks = [];
            res.collection.forEach(function (song) {
                ctrl.tracks.push(song.track);
            })
        });
    };

    function getGenres() {
        ChartsService.getGenres().$promise.then(function (res) {
            ctrl.genres = res;
            ctrl.selectedGenre = res[0];
        })
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