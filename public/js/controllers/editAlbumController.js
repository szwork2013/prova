(function(){

    angular.module('app').controller('editAlbumController',['$scope','albumResource','$routeParams',EditAlbumController]);

    function EditAlbumController($scope,albumResource,$routeParams) {
            console.log($routeParams.id);
            $scope.album = albumResource.get({id: $routeParams.id});

            $scope.uploader = {};

            $scope.upload = function () {
                $scope.uploader.flow.upload();

            }

            $scope.processFiles = function(files){
                console.log("ciao");
                console.log($scope.album);
                angular.forEach(files, function(flowFile, i){
                    var fileReader = new FileReader();
                    fileReader.onload = function (event) {
                        var uri = event.target.result;
                        $scope.album.images.push({url:uri});
                        $scope.$apply;
                    };
                    fileReader.readAsDataURL(flowFile.file);
                });
                console.log("dopo");
                console.log($scope.album)
            }

            $scope.save = function(){
                albumResource.update({ id:$scope.album._id },$scope.album);
            }

    }


})()