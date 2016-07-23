'use strict';

angular.module('app').controller('ChartsCtrl', function (ChartsService) {
    var ctrl = this;
    ctrl.tracks = [];

    ctrl.grid = true;
    ctrl.init = function () {
        getPopular();
    };

    function getPopular() {
        ChartsService.get().$promise.then(function (res) {
            console.log(res);
            res.collection.forEach(function (track) {
                ctrl.tracks.push(track);
            })
        });
    }

});