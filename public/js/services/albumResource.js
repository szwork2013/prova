(function(){

    angular.module('app').factory('albumResource',function($resource,$location){
        var protocol = $location.protocol();
        var host = location.host;
        var url = protocol + "://" + host + "/api/albums";
        return $resource(url + "/:id/:images",
            {
                id: "@id"
            },
            {
                update: {
                    method: 'PUT'
                },
                images:
                {
                    method: 'POST',
                    params :
                    {
                        id: "@id"
                    }


                }
            }
        );
    });

})();

