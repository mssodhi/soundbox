'use strict';

angular.module('app').controller('NavCtrl', function ($scope, LoginService, $location, MusicService, $timeout) {
    var ctrl = this;

    ctrl.menuItems = [];
    ctrl.menuItems.push(
        {title: 'Charts',    link: '#/charts'},
        {title: 'Browse',    link: '#/browse'},
        {title: 'Settings',  link: '#/settings'}
    );

    $scope.$watchCollection(function() { return $location.path(); }, function(route){
        ctrl.inApp = !(route === '/login' || route === '/deny');
    });

    ctrl.hideSideMenu = function () {
        $timeout(function () {
            ctrl.showSideMenu = false;
        }, 10);
    };

    ctrl.isActive = function (location) {
        if(location.substr(1, location.length) === $location.path()){
            return 'active-menu-item';
        }
    };

    ctrl.currentPath = function () {
        return '#' + $location.path();
    };

    ctrl.getNavBrandName = function () {
        if($location.path() !== '/'){
            return 'SB | ' + $location.path().charAt(1).toUpperCase();
        }else{
            return 'SoundBox';
        }
    };

    ctrl.signOut = function () {
        LoginService.logout().$promise.then(function () {
            $location.path('/login');
            if(MusicService.getIsPlaying()){
                MusicService.setPlayer();
            }
        });
    };

});