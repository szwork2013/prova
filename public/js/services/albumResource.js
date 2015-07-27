/**
 * Created by Sysdata on 22/07/2015.
 */
(function(){

    angular.module('app').factory('albumResource',function($resource,$location){
        var protocol = $location.protocol();
        var host = location.host;
        var url = protocol + "://" + host + "/api/albums";
        console.log(url);
        return $resource(url+"/:id",{id: "@id"});
    });

})();

