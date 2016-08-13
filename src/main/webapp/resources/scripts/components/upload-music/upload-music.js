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

        ctrl.addFiles = function (files) {
            files.forEach(function (file) {
                ctrl.files.push(file);
            });
        };

        ctrl.showUploadForm = function () {
            ctrl.showForm = true;
            ctrl.files = [];
        };

        ctrl.hideUploadForm = function () {
            ctrl.showForm = false;
            ctrl.files = [];
        };

        $scope.$watchCollection('ctrl.files', function () {
            ctrl.songs = [];
            ctrl.files.forEach(function (file) {
                var song = {
                    title: file.name,
                    duration: file.$ngfDuration * 1000,
                    file: file
                };
                ctrl.songs.push(song);
            })
        });

        ctrl.uploadFiles = function () {
            ctrl.songs.forEach(function (song) {
                SongService.save({id: ctrl.currentUser.fb_id}, song).$promise.then(function (res) {
                    if(res.id){

                        // upload the song picture
                        if(song.pic){
                            Upload.upload({
                                method: 'POST',
                                url: 'api/song/'+ res.id +'/image/save',
                                data: {
                                    image: song.pic
                                }
                            }).success(function() {
                                song.success = true;
                            });
                        }

                        // upload the actual song mp3 file
                        Upload.upload({
                            method: 'POST',
                            url: 'api/song/' + res.id + '/content/save',
                            data: {
                                musicFile: song.file
                            }
                        }).progress(function(evt) {
                            song.file.progress = Math.min(100, parseInt(100.0 *
                                evt.loaded / evt.total));
                        }).success(function() {
                            song.success = true;
                        });
                    }
                })

            });

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