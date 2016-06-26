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
                    favorites: function (FavoritesService) {
                        return FavoritesService.getFavorites({}).$promise;
                    }
                }
            }).when('/verify/:code', {
                templateUrl: 'resources/scripts/controllers/verify/verify.html',
                controller: 'VerifyCtrl',
                controllerAs: 'ctrl'
            }).when('/deny', {
                templateUrl: 'resources/scripts/controllers/deny/deny.html',
                caseInsensitiveMatch: true,
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
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
                    favorites: function (FavoritesService) {
                        return FavoritesService.getFavorites({}).$promise;
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
                    favorites: function (FavoritesService) {
                        return FavoritesService.getFavorites({}).$promise;
                    },
                    playlist: function (PlaylistService, $route) {
                        return PlaylistService.getPlaylistById({id: $route.current.params.id}).$promise;
                    }
                }
            }).when('/videos', {
                templateUrl: 'resources/scripts/controllers/video/video.html',
                controller: 'VideoCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    permissions: function(PermissionService){
                        return PermissionService.permissionCheck();
                    }
                }
            }).when('/profile', {
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
    CredentialsService.getSoundCloudCredentials().$promise.then(function (response) {
        SC.initialize({
            client_id: response.id,
            secret_token: response.secret,
            redirect_uri: 'http://localhost:8080/soundbox/#/'
        });
    });
});