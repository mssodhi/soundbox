'use strict';

angular.module('app').directive('circleError', function($uibModal) {
    return function (scope, element, attr) {
        var message = attr.message;
        if(!message || message.length === 0){
            message = 'Sorry, We seem to have a problem. Try refreshing the page or clicking the link below.';
        }
        
        return $uibModal.open({
            animation: true,
            templateUrl: 'resources/scripts/controllers/common/circle-error.html',
            controller: 'CommonModalCtrl',
            controllerAs: 'ctrl',
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                message: function(){
                    return message;
                }
            }
        });
    };

});