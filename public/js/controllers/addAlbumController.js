/**
 * Created by Sysdata on 31/07/2015.
 */
(function(){

    angular.module('app').controller('addAlbumController',['$scope','albumResource','$location','flash', AddAlbumController]);

    function AddAlbumController($scope,albumResource,$location,flash) {

        $scope.album = {};
        $scope.images = [];


        $scope.save = function(flow) {
            console.log($scope.album);
            $scope.album = albumResource.save($scope.album, onSuccess);

            function onSuccess(album) {
                angular.forEach(flow.files, function (el) {
                    var fileReader = new FileReader();
                    fileReader.onloadend = function () {
                        var data = fileReader.result.substr(event.target.result.indexOf('base64') + 7);
                        var image = {
                            name: el.name,
                            data: data
                        };
                        console.log(image);
                        albumResource.images(image);

                    }
                    fileReader.readAsDataURL(el.file);


                })
            }
        }

    }

})()