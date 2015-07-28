(function(){

    angular.module('app').factory('albumResource',function($resource,$location){
        var protocol = $location.protocol();
        var host = location.host;
        var url = protocol + "://" + host + "/api/albums";
        return $resource(url+"/:id",{id: "@id"});
    });

})();

