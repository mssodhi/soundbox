'use strict';

angular.module('app').controller('NavCtrl', function ($scope, LoginService, $location, MusicService, $timeout, UserService) {
    var ctrl = this;

    $scope.$watchCollection(function() { return $location.path(); }, function(route){
        ctrl.inApp = !(route === '/login' || route === '/deny');
        if(ctrl.inApp){
            ctrl.mainMenuItems = [];
            ctrl.sideMenuItems = [];
            UserService.getCurrentUser().$promise.then(function (res) {
                ctrl.currentUser = res;
                ctrl.mainMenuItems.push(
                    {title: 'Upload',    link: '#/upload', icon: 'fa fa-upload'},
                    {title: 'Me',        link: '#/artist/' + ctrl.currentUser.username, icon: 'fa fa-user'},
                    // {title: 'Charts',    link: '#/charts', icon: 'fa fa-bar-chart-o'},
                    {title: 'Browse',    link: '#/browse', icon: 'fa fa-list-alt'}
                );
                ctrl.sideMenuItems.push(
                    {title: 'Me',        link: '#/artist/' + ctrl.currentUser.username, icon: 'fa fa-user'},
                    {title: 'Upload',    link: '#/upload', icon: 'fa fa-upload'},
                    {title: 'Browse',    link: '#/browse', icon: 'fa fa-list-alt'},
                    // {title: 'Charts',    link: '#/charts', icon: 'fa fa-bar-chart-o'},
                    {title: 'Settings',  link: '#/settings', icon: 'fa fa-gears'},
                    {title: 'Analytics',  link: '#/analytics', icon: 'fa fa-line-chart'}
                );
            });
        }

    });

    ctrl.isScrolled = function () {
        return window.scrollY > 0;
    };

    ctrl.hideSideMenu = function () {
        $timeout(function () {
            ctrl.showSideMenu = false;
        }, 10);
    };

    ctrl.hideProfile = function () {
        $timeout(function () {
            ctrl.openProfile = false;
        }, 10);
    };

    ctrl.isActive = function (location) {
        if(location.substr(1, location.length) === $location.path()){
            return 'active-menu-item';
        }
    };

    ctrl.goToArtist = function (artist) {
        $location.path('/artist/'+artist.username);
    };

    ctrl.currentPath = function () {
        return '#' + $location.path();
    };

    ctrl.signOut = function () {
        LoginService.logout().$promise.then(function () {
            ctrl.currentUser = null;
            $location.path('/login');
            if(MusicService.getIsPlaying()){
                MusicService.stream(null);
                MusicService.pause();
            }
        });
    };

});