'use strict';

angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngAnimate'])
    .config(function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider
            .when('/', {
                templateUrl: 'resources/scripts/controllers/landing/landing.html',
                controller: 'LandingCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
                    },
                    profile: function (UserService) {
                        return UserService.getCurrentUser().$promise;
                    }
                }
            })
            .when('/deny',
            {
                templateUrl: 'resources/scripts/controllers/deny/deny.html',
                caseInsensitiveMatch: true,
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
                    }
                }
            })
            .when('/music', {
                templateUrl: 'resources/scripts/controllers/media/music.html',
                controller: 'MusicCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
                    },
                    profile: function(UserService){
                        return UserService.getCurrentUser().$promise;
                    }
                }
            })
            .when('/videos', {
                templateUrl: 'resources/scripts/controllers/media/video.html',
                controller: 'VideoCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
                    },
                    profile: function(UserService){
                        return UserService.getCurrentUser().$promise;
                    }
                }
            })
            .when('/profile', {
                templateUrl: 'resources/scripts/controllers/profile/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
                    },
                    profile: function(UserService){
                        return UserService.getCurrentUser().$promise;
                    }
                }
            })
            .when('/login', {
                templateUrl: 'resources/scripts/controllers/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    profile: function(UserService){
                        return UserService.getCurrentUser().$promise;
                    }
                }
            })
            .otherwise({
                redirectTo: '/deny'
            });
    });

angular.module('app').run(function ($window, $location) {

});