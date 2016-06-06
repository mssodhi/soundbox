'use strict';

angular.module('app').directive('circleCheck', function($uibModal) {
    return function (scope, element, attr) {
        var message = attr.message;
        if(!message || message.length === 0){
            message = 'Success!';
        }

        return $uibModal.open({
            animation: true,
            templateUrl: 'resources/scripts/controllers/common/circle-check.html',
            controller: 'CommonModalCtrl',
            controllerAs: 'ctrl',
            size: 'sm',
            resolve: {
                message: function(){
                    return message;
                }
            }
        });
    };

});