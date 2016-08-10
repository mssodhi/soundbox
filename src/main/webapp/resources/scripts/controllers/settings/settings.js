'use strict';

angular.module('app').controller('SettingsCtrl', function (profile, UserService, SettingsService, Upload, SongService, $sce) {
    var ctrl = this;
    ctrl.currentUser = profile;
    ctrl.files = [];

    ctrl.init = function () {
        ctrl.showAccount = true;
        SettingsService.getSettings({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
            ctrl.settings = response;
        });
    };

    ctrl.getUserSongs = function () {
        UserService.getMusicByUser({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
            ctrl.currentUser.songs = response;
            response.forEach(function (song) {
                SongService.getSong({id: song.id}).$promise.then(function (res) {
                    var int8Array = new Uint8Array(res.content);
                    var blob = new Blob([int8Array], {type: "audio/mp3"});
                    song.url = $sce.trustAsResourceUrl(window.URL.createObjectURL(blob));
                })
            })
        });
    };

    ctrl.printFiles = function () {
        ctrl.files.forEach(function (currentFile) {
            Upload.upload({
                method: 'POST',
                url: 'api/song/save/user/' + ctrl.currentUser.fb_id,
                data: {
                    file: currentFile
                }
            }).progress(function(evt) {
                currentFile.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            }).success(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });
        });

    }
});