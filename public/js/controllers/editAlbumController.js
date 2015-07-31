(function(){

    angular.module('app').controller('editAlbumController',['$scope','albumResource','$routeParams',EditAlbumController]);

    function EditAlbumController($scope,albumResource,$routeParams) {
            console.log($routeParams.id);
            $scope.album = albumResource.get({id: $routeParams.id});
            $scope.editMode = false;

            $scope.uploader = {};

            $scope.upload = function () {
                $scope.uploader.flow.upload();

            }

        $scope.setEditable = function(){
            $scope.editMode = true;
        }

            $scope.processFiles = function(files){
                console.log("ciao");
                console.log($scope.album);
                angular.forEach(files, function(flowFile, i){
                    var fileReader = new FileReader();

                    fileReader.onloadend = function (event) {
                        //var data = event.target.result;
                        var data = fileReader.result.substr(event.target.result.indexOf('base64')+7);
                        var uri = event.target.result;
                        $scope.album.images.push({url:uri ,data : data, isNew : true, name: flowFile.name});
                        $scope.$apply;
                    };
                    fileReader.readAsDataURL(flowFile.file);
                });
                console.log("dopo");
                console.log($scope.album);
            }
            $scope.deleteImage = function(index){
                $scope.album.images.splice(index,1);
            }
            $scope.save = function(){
                albumResource.update({ id:$scope.album._id },$scope.album);
            }

    }


})()