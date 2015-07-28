(function(){

    angular.module('app').controller('addAlbumController',['$scope','albumResource','$location','flash', AddAlbumController]);

    function AddAlbumController($scope,albumResource,$location,flash){
        $scope.album = {};
        $scope.album.images = [];

        var processed = 0;
        var toProcess = 0;

        $scope.save = function(flow){
            toProcess = flow.files.length;

            angular.forEach(flow.files,function(file){
                read(file,save_album);
            });
        };

        function save_album(){
            albumResource.save($scope.album,onSaveSuccess,onSaveError);
        }

        function onSaveSuccess(album){
            console.log("save success");
            flash.setMessage("Aggiunto nuovo album: " + album.name, "success");
            $location.path('/');
        }

        function onSaveError(reason){
            console.log(reason);
            flash.setMessage("Errore nel salvataggio dell'album","error");
            $location.path('/');
        }

        function read(el,callBackFunction){

            var fileReader = new FileReader();

            fileReader.onloadend = function(){

                var data = fileReader.result.substr(event.target.result.indexOf('base64')+7);
                $scope.album.images.push({
                    name:el.name,
                    mimeType: el.type,
                    data:data
                });
                processed++;

                if(processed == toProcess){
                   callBackFunction();
                }
            };

            fileReader.readAsDataURL(el.file);
        }

        $scope.success = function(file,message,flow){
            console.log("file uploaded");
        }



    };


})();
