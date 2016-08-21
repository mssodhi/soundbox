'use strict';

angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngAnimate', 'ngFileUpload'])
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
                    profile: function(UserService){
                        return UserService.getCurrentUser().$promise;
                    }
                }
            }).when('/deny', {
                templateUrl: 'resources/scripts/controllers/deny/deny.html',
                caseInsensitiveMatch: true,
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
                    }
                }
            }).when('/upload', {
                templateUrl: 'resources/scripts/controllers/upload/upload-view.html',
                resolve:{
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
                    }
                }
            }).when('/charts', {
                templateUrl: 'resources/scripts/controllers/charts/charts.html',
                controller: 'ChartsCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
                    },
                    profile: function(UserService){
                        return UserService.getCurrentUser().$promise;
                    }
                }
            }).when('/artist/:permalink', {
                templateUrl: 'resources/scripts/controllers/artist/artist.html',
                controller: 'ArtistCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
                    },
                    profile: function(UserService){
                        return UserService.getCurrentUser().$promise;
                    }
                }
            }).when('/playlist/:id', {
                templateUrl: 'resources/scripts/controllers/playlist/playlist.html',
                controller: 'PlaylistCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
                    },
                    profile: function(UserService){
                        return UserService.getCurrentUser().$promise;
                    },
                    playlist: function (PlaylistService, $route) {
                        return PlaylistService.getPlaylistById({id: $route.current.params.id}).$promise;
                    }
                }
            }).when('/settings', {
                templateUrl: 'resources/scripts/controllers/settings/settings.html',
                controller: 'SettingsCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
                    },
                    profile: function(UserService){
                        return UserService.getCurrentUser().$promise;
                    }
                }
            }).when('/browse', {
                templateUrl: 'resources/scripts/controllers/browse/browse.html',
                controller: 'BrowseCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
                    },
                    profile: function(UserService){
                        return UserService.getCurrentUser().$promise;
                    }
                }
            }).when('/login', {
                templateUrl: 'resources/scripts/controllers/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    profile: function(UserService){
                        return UserService.getCurrentUser().$promise;
                    }
                }
            }).otherwise({
                redirectTo: '/deny'
            });
    });

angular.module('app').run(function ($window, $location, CredentialsService) {

    // CredentialsService.getSoundCloudCredentials().$promise.then(function (response) {
    //     SC.initialize({
    //         client_id: response.id,
    //         secret_token: response.secret,
    //         redirect_uri: 'http://localhost:8080/soundbox/#/'
    //     });
    // });

    CredentialsService.getFacebookCredentials().$promise.then(function (res) {
        FB.init({
            appId      : res.app_id,
            cookie     : true,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : res.app_version // use graph api version 2.5
        });
    })
});