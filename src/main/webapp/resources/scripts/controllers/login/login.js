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
            controller: function ($uibModalInstance, LoginService, $location) {

                var ctrl = this;

                ctrl.init = function () {
                    ctrl.showLoginForm = true;
                    ctrl.showRegisterForm = false;
                };

                ctrl.switchForm = function (form) {
                    if(form === 'login'){
                        ctrl.init();
                    }else{
                        ctrl.showRegisterForm = true;
                        ctrl.showLoginForm = false;
                    }
                };

                ctrl.login = function(){
                    ctrl.noUserFound = false;
                    ctrl.password = MD5(ctrl.password);
                    LoginService.login({email: ctrl.email}, ctrl.password).$promise.then(function (response) {
                        if(response.id){
                            ctrl.goToLanding();
                        }else{
                            ctrl.noUserFound = true;
                        }
                    });
                };

                ctrl.register = function(){
                    ctrl.loading = true;
                    ctrl.emailNotValid = false;
                    if(validateEmail(ctrl.email)){
                        ctrl.passwordNotSame = false;
                        ctrl.emailTaken = false;
                        ctrl.verificationEmailSent = false;
                        if(ctrl.password === ctrl.repeatedPassword){
                            ctrl.password = MD5(ctrl.password);
                            ctrl.repeatedPassword = MD5(ctrl.password);
                            var user = {name: ctrl.name, email: ctrl.email, password: ctrl.password};
                            LoginService.checkEmailAvailability({email: ctrl.email}).$promise.then(function (response) {
                                if(response.taken !== 'true'){
                                    LoginService.addUser(user).$promise.then(function(response){
                                        if(response){
                                            ctrl.verificationEmailSent = true;
                                            ctrl.loading = false;
                                        }else{
                                            $location.path('/deny');
                                        }
                                    });
                                }else{
                                    ctrl.emailTaken = true;
                                    ctrl.loading = false;
                                }
                            });
                        }else{
                            ctrl.passwordNotSame = true;
                            ctrl.loading = false;
                        }
                    }else{
                        ctrl.emailNotValid = true;
                        ctrl.loading = false;
                    }

                };

                ctrl.isValid = function () {
                    if(ctrl.password && ctrl.repeatedPassword){
                        return ctrl.name && ctrl.email && ctrl.password.length > 0 && ctrl.repeatedPassword.length > 0;
                    }else{
                        return false;
                    }
                } ;

                ctrl.goToLanding = function () {
                    $uibModalInstance.close();
                    ctrl.loggedIn = true;
                };

                function validateEmail(email) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email);
                }
            }
        });
    };
});