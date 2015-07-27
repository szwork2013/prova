/**
 * Created by Sysdata on 23/07/2015.
 */

angular.module('app').controller('addEventController',['$scope','eventResource',AddEventController]);

function AddEventController($scope,eventResource){
    $scope.event = {};

    $scope.save = function(){
        console.log("saving");
        console.log($scope.event);
        eventResource.save($scope.event);
    }
}
