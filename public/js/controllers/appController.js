/**
 * Created by Sysdata on 23/07/2015.
 */
(function(){
    angular.module('app').controller('appController',['$scope','albumResource','eventResource',AppController]);

    function AppController($scope,albumResource,eventResource){

         $scope.albums = albumResource.query();
         $scope.events = eventResource.query();


    }

})();
