/**
 * Created by Sysdata on 28/07/2015.
 */
(function(){

    angular.module('app').controller('editEventController',['$scope','eventResource','$routeParams',EditEventController]);

    function EditEventController($scope,eventResource,$routeParams) {
        console.log($routeParams.id);
        $scope.event = eventResource.get({id: $routeParams.id});
    }
})()
