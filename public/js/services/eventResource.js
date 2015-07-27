/**
 * Created by Sysdata on 23/07/2015.
 */
(function(){

    angular.module('app').factory('eventResource',function($resource){
        var protocol = $location.protocol();
        var host = location.host;
        var url = protocol + "://" + host + "/api/events";
        console.log(url);
        return $resource(url);
    });

})()
