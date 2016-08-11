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
                duration: file.$ngfDuration * 1000,
                file: file
            };
            ctrl.songs.push(song);
        })
    });

    ctrl.init = function () {
        if(ctrl.currentUser.username){
            ctrl.showAccount = true;
        }else{
            ctrl.showWelcome = true;
        }
        SettingsService.getSettings({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
            ctrl.settings = response;
        });
    };

    ctrl.updateUser = function () {
        UserService.update(ctrl.currentUser).$promise.then(function (res) {
            ctrl.success = true;
            ctrl.currentUser = res;
        })
    };

    ctrl.uploadFiles = function () {
        ctrl.songs.forEach(function (song) {
            SongService.save({id: ctrl.currentUser.fb_id}, song).$promise.then(function (res) {
                if(res.id){

                    // upload the song picture
                    if(song.pic){
                        Upload.upload({
                            method: 'POST',
                            url: 'api/song/image/song/' + res.id,
                            data: {
                                file: song.pic
                            }
                        }).success(function() {
                            song.success = true;
                        });
                    }

                    // upload the actual song mp3 file
                    Upload.upload({
                        method: 'POST',
                        url: 'api/song/save/song/' + res.id,
                        data: {
                            file: song.file
                        }
                    }).progress(function(evt) {
                        song.file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    }).success(function() {
                        song.success = true;
                    });
                }
            })

        });

    };

    ctrl.milliToTime = function (milli) {
        var minutes = Math.floor(milli / 60000);
        var seconds = ((milli % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };
});