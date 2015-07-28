(function(){
    angular.module('app').controller('appController',['$scope','albumResource','eventResource',AppController]);

    function AppController($scope,albumResource,eventResource){

         $scope.albums = albumResource.query();
         $scope.events = eventResource.query();


    }

})();
