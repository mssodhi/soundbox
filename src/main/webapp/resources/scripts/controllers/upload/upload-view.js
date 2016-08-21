'use strict';

angular.module('app').controller('UploadViewCtrl', function (profile) {
    var ctrl = this;
    ctrl.currentUser = profile;
});