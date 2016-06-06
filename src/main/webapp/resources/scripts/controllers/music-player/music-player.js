'use strict';

angular.module('app').controller('MusicPlayerCtrl', function ($interval, MusicService, hotkeys, $document, $window) {
    var ctrl = this;

    ctrl.init = function () {
        $interval(runLoop, 250);
    };
    
    var runLoop = function () {
        ctrl.player = MusicService.getPlayer();
        ctrl.isPlaying = MusicService.getIsPlaying();
        ctrl.track = MusicService.getTrack();
        var progressbar = document.getElementById('progress-bar');

        // setting the progress bar
        if (ctrl.player) {
            ctrl.progress = ((ctrl.player.currentTime()) / (ctrl.track.duration)) * 100;
            ctrl.myStyle = {'width': ctrl.progress + '%'};
            if (ctrl.progress >= 100) {
                ctrl.isPlaying = false;
                ctrl.next();
            }
        }
        if (progressbar) {
            progressbar.addEventListener('click', function (e) {
                var after = ctrl.track.duration * e.offsetX / this.offsetWidth;
                MusicService.seek(after);
            });
        }
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

    hotkeys.add({
        combo: 'space',
        description: 'Play/Pause',
        callback: function(event, hotkey) {
            ctrl.xBefore = window.pageXOffset;
            ctrl.yBefore = window.pageYOffset;
            if(ctrl.player){
                if(ctrl.isPlaying){
                    ctrl.pause();
                }else{
                    ctrl.play();
                }
                ctrl.noScroll();
            }
        }
    });
    hotkeys.add({
        combo: 'left',
        description: 'Previous',
        callback: function(event, hotkey) {
            if(ctrl.player){
                ctrl.getPrevious();
            }
        }
    });
    hotkeys.add({
        combo: 'right',
        description: 'Next',
        callback: function(event, hotkey) {
            if(ctrl.player){
                ctrl.next();
            }
        }
    });

    ctrl.noScroll = function () {
        $document.on('scroll', function() {
            if(ctrl.xBefore !== null && ctrl.yBefore !== null){
                $window.scrollTo(ctrl.xBefore, ctrl.yBefore);
                $window.setTimeout(function () {
                    ctrl.xBefore = null;
                    ctrl.yBefore = null;
                }, 250);
            }
        });
    }

});