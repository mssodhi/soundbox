'use strict';

angular.module('app').controller('SettingsCtrl', function (profile, UserService, SettingsService, Upload) {
    var ctrl = this;
    ctrl.currentUser = profile;
    ctrl.files = [];

    ctrl.init = function () {
        ctrl.showAccount = true;
        SettingsService.getSettings({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
            ctrl.settings = response;
        });
    };

    ctrl.printFiles = function () {
        ctrl.files.forEach(function (currentFile) {
            Upload.upload({
                method: 'POST',
                url: 'api/upload/save/user/' + ctrl.currentUser.fb_id,
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