'use strict';

angular.module('app').component("dashboard", {
    templateUrl: 'resources/scripts/components/dashboard/dashboard.html',
    controllerAs: 'ctrl',
    controller: function ($location, UserService, AnalyticsService) {
        var ctrl = this;
        ctrl.init = function () {
            UserService.getCurrentUser().$promise.then(function (res) {
                ctrl.currentUser = res;
                AnalyticsService.getAnalytics({id: res.fb_id}).$promise.then(function (analytics) {
                    if(analytics.id){
                        ctrl.analytics = analytics;
                        if(ctrl.analytics.previous_views_count === 0){
                            ctrl.analytics.viewsPercentage = 0;
                        }else{
                            ctrl.analytics.viewsPercentage = ((ctrl.analytics.daily_views_count - ctrl.analytics.previous_views_count) / ctrl.analytics.previous_views_count) * 100;
                        }
                    }
                });

            })
        };
    },
    bindings: {
        following: '='
    }
});