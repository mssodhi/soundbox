'use strict';

angular.module('app').controller('LoginCtrl', function ($location, profile, $uibModal) {
    var ctrl = this;

    ctrl.init = function () {
        if (profile.username && profile.id != null) {
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
                    if (response.authResponse) {
                        loginUser();
                    } else {
                        FB.login(function (response) {
                            if (response.authResponse) {
                                loginUser();
                            }
                        });
                    }
                }

                function loginUser() {
                    FB.api('/me', function (response) {
                        LoginService.checkUser({uid: response.id}, response.name).$promise.then(function (user) {
                            if (user.id && !user.pic_url) {
                                FB.api('/' + response.id + '/picture',
                                    function (response) {
                                        if (response && !response.error) {
                                            UserService.setPic({id: user.fb_id}, response.data.url);
                                        }
                                    }
                                );
                            }
                            if (!user.username) {
                                ctrl.user = user;
                                ctrl.showLoginForm = true;
                            } else {
                                goToLanding();
                            }
                        });
                    });
                }

                ctrl.checkUserName = function () {
                    if (ctrl.user.username.length > 0) {
                        ctrl.usernameTaken = false;
                        LoginService.checkUsername(ctrl.user.username).$promise.then(function (res) {
                            console.log(res);
                            if (res.taken === 'true') {
                                ctrl.usernameTaken = true;
                            }
                        })
                    }
                };

                ctrl.updateUser = function () {
                    UserService.update(ctrl.user).$promise.then(function (res) {
                        console.log(res);
                        if (res.id) {
                            goToLanding();
                        }
                    })
                };

                ctrl.login = function () {
                    getStatus();
                };

                function getStatus() {
                    FB.getLoginStatus(function (response) {
                        statusChangeCallback(response);
                    });
                }

                ctrl.demo = function () {
                    LoginService.demo().$promise.then(function (res) {
                        if (res.id) {
                            goToLanding();
                        }
                    });
                };

                function goToLanding() {
                    $timeout(function () {
                        $uibModalInstance.dismiss();
                    }, 2000);
                    if (MusicService.getPlayer()) {
                        MusicService.stream(null);
                        MusicService.pause();
                    }
                    ctrl.loggedIn = true;
                }

            }
        });
    };
});