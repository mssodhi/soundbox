// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
'use strict';

angular.module('app').controller('CircleCheckModalCtrl', function ($uibModalInstance, $location) {
    var ctrl = this;
    
    ctrl.init = function () {
        setTimeout(function () {
            $uibModalInstance.close();
            $location.path('/');
        }, 3000);
    };

});