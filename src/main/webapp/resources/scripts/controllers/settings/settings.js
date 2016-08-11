'use strict';

angular.module('app').controller('SettingsCtrl', function (profile, UserService, SettingsService, Upload, SongService, $sce, MusicService, $scope) {
    var ctrl = this;
    ctrl.currentUser = profile;
    ctrl.files = [];

    $scope.$watchCollection('ctrl.files', function () {
        ctrl.songs = [];
        ctrl.files.forEach(function (file) {
            var song = {
                title: file.name,
                duration: ctrl.secToMin(file.$ngfDuration),
                file: file
            };
            ctrl.songs.push(song);
        })
    });

    ctrl.init = function () {
        ctrl.showAccount = true;
        SettingsService.getSettings({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
            ctrl.settings = response;
        });
    };

    ctrl.getUserSongs = function () {
        UserService.getMusicByUser({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
            ctrl.currentUser.songs = response;
        });
    };

    ctrl.select = function (song) {
        SongService.getSong({id: song.id}).$promise.then(function (res) {
            var int8Array = new Uint8Array(res.content);
            var blob = new Blob([int8Array], {type: "audio/mp3"});
            var player = document.createElement("AUDIO");

            player.src = $sce.trustAsResourceUrl(window.URL.createObjectURL(blob));
            player.title = song.name;
            var track = {
                duration: '5:00',
                title: song.name,
                user: {
                    permalink: 'testing'
                }
            };

            MusicService.setOwnPlayer(player, track);
        })
    };

    ctrl.uploadFiles = function () {
        ctrl.songs.forEach(function (song) {
            console.log(song);
            SongService.save({id: ctrl.currentUser.fb_id}, song).$promise.then(function (res) {
                if(res.id){

                    Upload.upload({
                        method: 'POST',
                        url: 'api/song/image/song/' + res.id,
                        data: {
                            file: song.pic
                        }
                    }).success(function() {
                        song.success = true;
                    });


                    Upload.upload({
                        method: 'POST',
                        url: 'api/song/save/song/' + res.id,
                        data: {
                            file: song.file
                        }
                    }).progress(function(evt) {
                        song.file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    }).success(function(data, status, headers, config) {
                        song.success = true;
                        console.log(data, status, headers, config);
                    });
                }
            })

        });

    };

    ctrl.secToMin = function (time) {
        var minutes = "0" + Math.floor(time / 60);
        var seconds = "0" + (time - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }
});