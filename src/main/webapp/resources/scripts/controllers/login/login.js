'use strict';

angular.module('app').controller('LoginCtrl', function ($location, profile, $uibModal) {
    var ctrl = this;

    var slides = ctrl.slides = [];
    var currIndex = 0;

    ctrl.init = function () {
        ctrl.myInterval = 3000;
        ctrl.active = 0;

        if(profile.id != null){
            $location.path('/');
        }

        for(var i = 0; i < 2; i++){
            ctrl.addSlides();
        }

    };

    ctrl.addSlides = function() {
        var url;

        if(currIndex === 0){
            url = 'resources/scripts/controllers/login/carousel/first.html'
        }
        if(currIndex === 1){
            url = 'resources/scripts/controllers/login/carousel/second.html'
        }
        slides.push({
            url: url,
            id: currIndex++
        });
    };

    ctrl.openModal = function () {
        $uibModal.open({
            animation: true,
            templateUrl: 'resources/scripts/controllers/login/login-modal.html',
            controller: 'LoginModalCtrl',
            controllerAs: 'ctrl'
        });
    };
});