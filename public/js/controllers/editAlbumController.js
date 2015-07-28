(function(){

    angular.module('app').controller('editAlbumController',['$scope','albumResource','$routeParams',EditAlbumController]);

    function EditAlbumController($scope,albumResource,$routeParams) {
            console.log($routeParams.id);
            $scope.album = albumResource.get({id: $routeParams.id});
    }

})()