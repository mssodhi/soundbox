'use strict';

angular.module('app').component("uploadMusic", {
    templateUrl: 'resources/scripts/components/upload-music/upload-music.html',
    controllerAs: 'ctrl',
    controller: function (UserService, $scope, SongService, Upload, $sce) {
        var ctrl = this;

        ctrl.init = function () {
            ctrl.files = [];
            UserService.getCurrentUser().$promise.then(function (res) {
                ctrl.currentUser = res;
            })
        };

        ctrl.toggleRelease = function (song) {
            song.releaseImmediately = !song.releaseImmediately;
            if(song.releaseImmediately){
                song.releaseDate = new Date();
            }else{
                song.releaseDate = null;
            }
        };

        $scope.$watchCollection('ctrl.files', function () {
            ctrl.songs = ctrl.files.map(function (file) {
                return {
                    title: file.name,
                    duration: file.$ngfDuration * 1000,
                    file: file,
                    releaseImmediately: true,
                    releaseDate: new Date(),
                    inAlbum: false
                }
            });
        });

        ctrl.upload = function (song) {
            var payload = {
                title: song.title,
                duration: song.file.$ngfDuration * 1000
            };
            SongService.save({id: ctrl.currentUser.fb_id}, payload).$promise.then(function (res) {
                if(res.id){
                    uploadFile(res, song);
                    if(song.lyrics.length > 0){
                        var lyrics = {
                            text: song.lyrics,
                            song: res
                        };
                        SongService.saveLyrics(lyrics);
                    }
                }
            })
        };

        function uploadFile(res, song) {
            Upload.upload({
                method: 'POST',
                url: 'api/song/' + res.id + '/file/save',
                data: {
                    musicFile: song.file
                }
            }).progress(function(evt) {
                song.file.showProgress = true;
                song.file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            }).success(function() {
                if(song.pic){
                    song.file.progress = 0;
                    uploadPic(res, song);
                }else{
                    song.success = true;
                    song.showProgress = false;
                }
            });
        }

        function uploadPic(res, song) {
            Upload.upload({
                method: 'POST',
                url: 'api/song/'+ res.id +'/image/save',
                data: {
                    image: song.pic
                }
            }).progress(function (evt) {
                song.pic.showProgress = true;
                song.pic.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            }).success(function() {
                song.success = true;
                song.showProgress = false;
            });
        }

        ctrl.switchTab = function (song, tab) {
            switch (tab){
                case 'details':
                    song.showDetailsTab = true;
                    song.showLyricsTab = false;
                    song.showReleaseTab = false;
                    song.showConfirmTab = false;
                    break;
                case 'lyrics':
                    song.showDetailsTab = false;
                    song.showLyricsTab = true;
                    song.showReleaseTab = false;
                    song.showConfirmTab = false;
                    break;
                case 'release':
                    song.showDetailsTab = false;
                    song.showLyricsTab = false;
                    song.showReleaseTab = true;
                    song.showConfirmTab = false;
                    break;
                case 'confirm':
                    song.showDetailsTab = false;
                    song.showLyricsTab = false;
                    song.showReleaseTab = false;
                    song.showConfirmTab = true;
                    break;
                default:
                    break;
            }
        };

        ctrl.milliToTime = function (milli) {
            var minutes = Math.floor(milli / 60000);
            var seconds = ((milli % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        };

        ctrl.makeUrl = function (song) {
            song.artwork_url = $sce.trustAsResourceUrl(window.URL.createObjectURL(song.pic));
        };

    }
});