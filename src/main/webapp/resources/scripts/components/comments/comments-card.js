'use strict';

angular.module('app').component("commentsCard", {
    templateUrl: 'resources/scripts/components/comments/comments-card.html',
    controllerAs: 'ctrl',
    controller: function (UserService, CommentsService) {
        var ctrl = this;
        ctrl.init = function () {
            UserService.getCurrentUser().$promise.then(function (res) {
                ctrl.currentUser = res;
            });
            CommentsService.getComments({id: ctrl.song.id}).$promise.then(function (comments) {
                ctrl.comments = comments;
            });
        };

        ctrl.postComment = function (text) {
            if(text.length > 0){
                var comment = {
                    text: text,
                    author: ctrl.currentUser
                };

                CommentsService.postComment({id: ctrl.song.id}, comment).$promise.then(function (res) {
                    console.log(res);
                })
            }
        };

    },
    bindings: {
        song: '=',
        show: '='
    }
});