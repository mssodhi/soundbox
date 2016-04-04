'use strict';

angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngAnimate'])
    .config(function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider
            .when('/', {
                templateUrl: 'resources/scripts/controllers/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck(1);
                    }
                }
            })
            .when('/deny',
            {
                templateUrl: 'resources/scripts/controllers/deny/deny.html',
                caseInsensitiveMatch: true
            })
            .when('/music', {
                templateUrl: 'resources/scripts/controllers/media/music.html',
                controller: 'MusicCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck(0);
                    },
                    profile: function(LocalStorage){
                        return LocalStorage.getUser();
                    }
                }
            })
            .when('/videos', {
                templateUrl: 'resources/scripts/controllers/media/video.html',
                controller: 'VideoCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck(0);
                    },
                    profile: function(LocalStorage){
                        return LocalStorage.getUser();
                    }
                }
            })
            .when('/profile', {
                templateUrl: 'resources/scripts/controllers/profile/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck(0);
                    },
                    profile: function(LocalStorage){
                        return LocalStorage.getUser();
                    }
                }
            })
            .when('/landing', {
                templateUrl: 'resources/scripts/controllers/landing/landing.html',
                controller: 'LandingCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck(0);
                    },
                    profile: function(LocalStorage){
                        return LocalStorage.getUser();
                    }
                }
            })
            .otherwise({
                redirectTo: '/deny'
            });
    });

angular.module('app').run(function ($window, $location) {

});