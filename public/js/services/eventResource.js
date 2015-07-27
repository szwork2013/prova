/**
 * Created by Sysdata on 23/07/2015.
 */
(function(){

    angular.module('app').factory('eventResource',function($resource){
        return $resource('http://prova-rcmtest.rhcloud.com/api/events');
    }) ;

})()
