angular.module('app').controller('addEventController',['$scope','eventResource','$location','flash',AddEventController]);

function AddEventController($scope,eventResource,$location,flash){
    $scope.event = {};

    $scope.save = function(){
        console.log("saving");
        console.log($scope.event);
        eventResource.save($scope.event,onSaveSuccess,onSaveError);
    }

    function onSaveSuccess(event){
        console.log("Event saved");
        flash.setMessage("Aggiunto nuovo evento: " + event.name, "success");
        $location.path("/");
    }

    function onSaveError(reason){
        console.log("Event save error")
        console.log(reason);
        flash.setMessage("Errore nel salvataggio dell'evento","error");
        $location.path("/");
    }
}
