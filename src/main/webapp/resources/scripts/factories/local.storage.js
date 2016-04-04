'use strict';

angular.module('app').factory('LocalStorage', function($window, $rootScope, $location, UserService) {
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('user-email', val);
            return this;
        },
        getData: function() {
            return $window.localStorage && $window.localStorage.getItem('user-email');
        },
        getUser: function() {
            var email =  $window.localStorage && $window.localStorage.getItem('user-email');
            return UserService.getByEmail({email: email}).$promise;
        },
        clear: function() {
            $window.localStorage.clear();
            $location.path('/');
        }
    };
});