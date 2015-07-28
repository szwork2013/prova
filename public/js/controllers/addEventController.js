angular.module('app').controller('addEventController',['$scope','eventResource','$location',AddEventController]);

function AddEventController($scope,eventResource,$location){
    $scope.event = {};

    $scope.save = function(){
        console.log("saving");
        console.log($scope.event);
        eventResource.save($scope.event,onSaveSuccess,onSaveError);
    }

    function onSaveSuccess(){
        console.log("Event saved");
        $location.path("/");
    }

    function onSaveError(reason){
        console.log("Event save error")
        console.log(reason);
        $location.path("/");
    }
}
