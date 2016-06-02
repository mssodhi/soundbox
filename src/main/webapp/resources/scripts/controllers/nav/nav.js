'use strict';

angular.module('app').controller('NavCtrl', function ($interval, UserService, $location, MusicService, CredentialsService) {
    var ctrl = this;

    CredentialsService.getSoundCloudCredentials().$promise.then(function (response) {
        SC.initialize({
            client_id: response.id,
            secret_token: response.secret,
            redirect_uri: 'http://localhost:8080/test/#/'
        });
    });

    ctrl.currentUser = null;

    ctrl.init = function () {
        ctrl.getCurrentTime();
        $interval(ctrl.getCurrentTime, 250);
    };

    ctrl.isActive = function (location) {
        if(location === $location.path()){
            return 'active-menu-item';
        }
    };

    ctrl.getCurrentTime = function () {

        ctrl.inApp = !($location.path() == '/login');

        if (!ctrl.inApp) {
            ctrl.currentUser = null;
            // invalidate the player on signout
            MusicService.setPlayer(null, null);
        }

        if (ctrl.inApp && ctrl.currentUser == null) {
            UserService.getCurrentUser().$promise.then(function (response) {
                ctrl.currentUser = response;
            });
        }

        ctrl.player = MusicService.getPlayer();
        ctrl.isPlaying = MusicService.getIsPlaying();
        ctrl.track = MusicService.getTrack();

        // setting the progress bar
        if (ctrl.player) {
            ctrl.progress = ((ctrl.player.currentTime()) / (ctrl.track.duration)) * 100;
            ctrl.myStyle = {'width': ctrl.progress + '%'};
            if (ctrl.progress >= 100) {
                ctrl.isPlaying = false;
                ctrl.next();
            }
        }

        // used for seeking the track
        var progressbar = document.getElementById('progress-bar');
        if (progressbar) {
            progressbar.addEventListener('click', function (e) {
                var after = ctrl.track.duration * e.offsetX / this.offsetWidth;
                MusicService.seek(after);
            });
        }

    };

    ctrl.signOut = function () {
        UserService.logout().$promise.then(function () {
            $location.path('/login');
        });
    };

    ctrl.play = function () {
        MusicService.play();
    };

    ctrl.pause = function () {
        MusicService.pause();
    };

    ctrl.rewind = function () {
        MusicService.rewind();
    };

    ctrl.getPrevious = function () {
        ctrl.stream(MusicService.getPrevious());
    };

    ctrl.next = function() {
        ctrl.stream(MusicService.getNext());
    };

    ctrl.milliToTime = function (milli) {
        var minutes = Math.floor(milli / 60000);
        var seconds = ((milli % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    ctrl.stream = function (track) {
        SC.stream('/tracks/' + track.id, {autoPlay: true}).then(function (player) {
            MusicService.setPlayer(player, track);
        });
    };

});