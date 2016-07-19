'use strict';

angular.module('app').controller('LoginCtrl', function ($location, profile, $uibModal) {
    var ctrl = this;

    var slides = ctrl.slides = [];
    var currIndex = 0;

    ctrl.init = function () {
        // show next slide every 3 seconds
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
            controllerAs: 'ctrl',
            controller: function ($uibModalInstance, LoginService, UserService) {

                var ctrl = this;

                function statusChangeCallback(response) {
                    if (response.status === 'connected') {
                        // Logged into your app and Facebook.
                        FB.api('/me?fields=name,email', function(response) {
                            LoginService.checkUser({uid: response.id, email: response.email}, response.name).$promise.then(function (user) {
                                if(user.id){
                                    if(!user.pic_url){
                                        FB.api(
                                            '/' + response.id + '/picture',
                                            function (response) {
                                                if (response && !response.error) {
                                                    UserService.setPic(response.data.url);
                                                }
                                            }
                                        );
                                    }
                                    ctrl.goToLanding();
                                }
                            });
                        });
                    } else {
                        FB.login();
                    }
                }

                ctrl.login = function () {
                    getStatus();
                };

                function getStatus () {
                    FB.getLoginStatus(function(response) {
                        statusChangeCallback(response);
                    });
                }

                ctrl.goToLanding = function () {
                    $uibModalInstance.close();
                    ctrl.loggedIn = true;
                };

            }
        });
    };
});