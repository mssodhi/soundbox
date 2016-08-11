'use strict';

angular.module('app').component('musicPlayer', {
    templateUrl: 'resources/scripts/components/music-player/music-player.html',
    controllerAs: 'ctrl',
    controller: function ($interval, MusicService, PageService) {
        var ctrl = this;
        var progressbar;
        ctrl.tracks = [];
        ctrl.init = function () {
            $interval(runLoop, 250);
            registerKeys();
        };

        ctrl.getQueue = function () {
            ctrl.queue = MusicService.getQueue();
        };

        function runLoop() {
            ctrl.player = MusicService.getPlayer();
            ctrl.track = MusicService.getTrack();
            ctrl.isPlaying = MusicService.getIsPlaying();
            // setting the progress bar
            if (ctrl.player && ctrl.isPlaying) {

                progressbar = document.getElementById('progress-bar');
                ctrl.progress = ((ctrl.player.currentTime) / (ctrl.player.duration)) * 100;
                ctrl.myStyle = {'width': ctrl.progress + '%'};
                PageService.setTitle(ctrl.track.title);
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
            milli *= 1000;
            var minutes = Math.floor(milli / 60000);
            var seconds = ((milli % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        };

        ctrl.stream = function (song) {
            MusicService.stream(song);
        };

        function registerProgressBar() {
            progressbar.addEventListener('click', function (e) {
                var after = ctrl.player.duration * e.offsetX / this.offsetWidth;
                MusicService.seek(after);
            });
        }

        function registerKeys() {
            document.onkeydown = function(e) {
                if(e.target === document.body){
                    switch (e.keyCode) {
                        case 32:
                            if(ctrl.isPlaying){
                                ctrl.pause();
                            }else{
                                ctrl.play();
                            }
                            e.preventDefault();
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
                }
            };
        }
    }
});