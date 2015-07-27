/**
 * Created by Sysdata on 22/07/2015.
 */
(function(){

    angular.module('app').factory('albumResource',function($resource){
        return $resource("http://prova-rcmtest.rhcloud.com/api/albums");
    });

})();

