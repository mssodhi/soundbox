'use strict';

angular.module('app').controller('NavCtrl', function ($scope, LoginService, $location, MusicService, $timeout) {
    var ctrl = this;

    ctrl.menuItems = [];
    ctrl.menuItems.push(
        {title: 'Dashboard', link: '#/'},
        {title: 'Browse',    link: '#/browse'},
        {title: 'Settings',  link: '#/settings'},
        {title: 'Charts',    link: '#/charts'}
    );

    $scope.$watchCollection(function() { return $location.path(); }, function(route){
        ctrl.inApp = !(route === '/login' || route === '/deny');
    });

    ctrl.navTo = function (obj) {
        console.log(obj);
        $location.path(obj);
    };

    ctrl.hideSideMenu = function () {
        $timeout(function () {
            ctrl.showSideMenu = false;
        }, 10);
    };

    ctrl.currentPath = function () {
        return '#' + $location.path();
    };

    ctrl.getNavBrandName = function () {
        if($location.path() !== '/'){
            return 'SB | ' + $location.path().slice(1, $location.path().length).toUpperCase();
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