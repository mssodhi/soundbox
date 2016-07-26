'use strict';

angular.module('app').controller('LoginCtrl', function ($location, profile, $uibModal) {
    var ctrl = this;

    ctrl.init = function () {
        if(profile.id != null){
            $location.path('/');
        }
    };

    ctrl.openModal = function () {
        $uibModal.open({
            animation: true,
            templateUrl: 'resources/scripts/controllers/login/login-modal.html',
            controllerAs: 'ctrl',
            controller: function ($uibModalInstance, LoginService, UserService, MusicService, $timeout) {

                var ctrl = this;

                function statusChangeCallback(response) {
                    if (response.status === 'connected') {
                        // Logged into your app and Facebook.
                        FB.api('/me', function (response) {
                            // console.log(response);
                            LoginService.checkUser({uid: response.id}, response.name).$promise.then(function (user) {
                                if (user.id) {
                                    if (!user.pic_url) {
                                        FB.api(
                                            '/' + response.id + '/picture',
                                            function (response) {
                                                if (response && !response.error) {
                                                    UserService.setPic({id: user.fb_id}, response.data.url);
                                                }
                                            }
                                        );
                                    }
                                    goToLanding();
                                }
                            });
                        });
                    }else {
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

                ctrl.demo = function () {
                    LoginService.demo().$promise.then(function (res) {
                        if(res.id){
                            goToLanding();
                        }
                    });
                };

                function goToLanding() {
                    $timeout(function () {
                        $uibModalInstance.dismiss();
                    }, 2000);
                    if(MusicService.getPlayer()){
                        MusicService.setPlayer(null);
                    }
                    ctrl.loggedIn = true;
                }

            }
        });
    };
});