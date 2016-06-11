'use strict';

angular.module('app').controller('NavCtrl', function ($scope, UserService, $location, MusicService) {
    var ctrl = this;

    $scope.$watchCollection(function() { return $location.path(); }, function(route){
        ctrl.inApp = !(route === '/login' || route.includes('/verify') || route === '/deny');
    });

    ctrl.isActive = function (location) {
        if(location === $location.path()){
            return 'active-menu-item';
        }
    };
    
    ctrl.getNavBrandName = function () {
        if($location.path() !== '/'){
            return 'SB | ' + $location.path().charAt(1).toUpperCase();
        }else{
            return 'SoundBox';
        }
    };

    ctrl.signOut = function () {
        UserService.logout().$promise.then(function () {
            $location.path('/login');
            MusicService.setPlayer(null, null);
        });
    };

});