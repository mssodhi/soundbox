'use strict';

angular.module('app').controller('VideoCtrl', ['MediaService', 'profile', '$http', '$sce', function (MediaService, profile, $http, $sce) {
    var ctrl = this;
    ctrl.currentUser = profile;
    var key;
    ctrl.videosList = [];

    ctrl.init = function () {
        MediaService.getYouTubeCredentials().$promise.then(function (response) {
            key = response.key;
            ctrl.getPopular();
        });
    };

    ctrl.search = function () {

        ctrl.videosList = [];
        ctrl.showList = false;
        $http.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    key: key,
                    type: 'video',
                    maxResults: '30',
                    part: 'id,snippet',
                    q: ctrl.q
                }
            })
            .success( function (data) {
                ctrl.isPopular = false;
                ctrl.videosList = data.items;
                ctrl.showList = true;
            });
    };

    ctrl.play = function (video) {
        ctrl.playVideo = true;
        if(ctrl.isPopular){
            ctrl.src =  "http://www.youtube.com/embed/" + video.id + "?enablejsapi=1";
        }else{
            ctrl.src =  "http://www.youtube.com/embed/" + video.id.videoId + "?enablejsapi=1";
        }
        window.scrollTo(0,0);
    };

    ctrl.getSrc = function () {
        return $sce.trustAsResourceUrl(ctrl.src);
    };

    ctrl.getPopular = function() {
        $http.get('https://www.googleapis.com/youtube/v3/videos?chart=mostPopular',{
            params: {
                key: key,
                type: 'video',
                maxResults: '30',
                part: 'snippet,statistics'
            }
        }).success( function (data) {
            ctrl.isPopular = true;
            ctrl.videosList = data.items;
            ctrl.showList = true;
        });
    }


}]);