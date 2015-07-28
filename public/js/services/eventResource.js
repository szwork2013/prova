(function(){

    angular.module('app').factory('eventResource',function($resource, $location){
        var protocol = $location.protocol();
        var host = location.host;
        var url = protocol + "://" + host + "/api/events";
        return $resource(url);
    });

})()
