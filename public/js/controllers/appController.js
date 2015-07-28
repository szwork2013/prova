(function(){
    angular.module('app').controller('appController',['$scope','albumResource','eventResource','flash',AppController]);

    function AppController($scope,albumResource,eventResource,flash){
         $scope.flash = flash;
         $scope.albums = albumResource.query();
         $scope.events = eventResource.query();
    }

})();
