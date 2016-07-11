'use strict';

angular.module('app').component('musicPlayer', {
    templateUrl: 'resources/scripts/components/music-player/music-player.html',
    controllerAs: 'ctrl',
    controller: function ($interval, MusicService) {
        var ctrl = this;
        var progressbar;

        ctrl.init = function () {
            $interval(runLoop, 250);
            registerKeys();
        };

        function runLoop() {
            ctrl.player = MusicService.getPlayer();
            ctrl.track = MusicService.getTrack();

            // setting the progress bar
            if (ctrl.player) {
                ctrl.isPlaying = MusicService.getIsPlaying();
                progressbar = document.getElementById('progress-bar');
                ctrl.progress = ((ctrl.player.currentTime()) / (ctrl.track.duration)) * 100;
                ctrl.myStyle = {'width': ctrl.progress + '%'};
            }

            if (progressbar) {
                registerProgressBar();
            }
        }

        ctrl.play = function () {
            MusicService.play();
            ctrl.isPlaying = true;
        };

        ctrl.pause = function () {
            MusicService.pause();
            ctrl.isPlaying = false;
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
                player.on('finish', function () {
                    player.seek(0);
                    ctrl.stream(MusicService.getNext());
                });
                MusicService.setPlayer(player, track);
            });
        };

        function registerProgressBar() {
            progressbar.addEventListener('click', function (e) {
                var after = ctrl.track.duration * e.offsetX / this.offsetWidth;
                MusicService.seek(after);
            });
        }

        function registerKeys() {
            document.onkeydown = function(e) {
                switch (e.keyCode) {
                    case 32:
                        if(ctrl.player && e.target === document.body){
                            if(ctrl.isPlaying){
                                ctrl.pause();
                            }else{
                                ctrl.play();
                            }
                            e.preventDefault();
                        }
                        break;
                    case 37:
                        if(ctrl.player){
                            ctrl.getPrevious();
                        }
                        break;
                    case 39:
                        if(ctrl.player){
                            ctrl.next();
                        }
                        break;
                }
            };
        }
    }
});