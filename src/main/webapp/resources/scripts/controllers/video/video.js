'use strict';

angular.module('app').controller('VideoCtrl', function (CredentialsService, $http, $sce) {
    var ctrl = this;
    var key;
    ctrl.videosList = [];

    ctrl.init = function () {
        CredentialsService.getYouTubeCredentials().$promise.then(function (response) {
            key = response.key;
            ctrl.getPopular();
        });
    };

    ctrl.search = function (query) {

        ctrl.videosList = [];
        ctrl.showList = false;
        $http.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    key: key,
                    type: 'video',
                    maxResults: '30',
                    part: 'id,snippet',
                    q: query
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
        ctrl.query = '';
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

});