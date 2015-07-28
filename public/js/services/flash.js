/**
 * Created by Sysdata on 28/07/2015.
 */
angular.module('app').factory('flash',['$rootScope',Flash]);

function Flash($rootScope){
    var queue = [];
    var currentMessage = null;

    $rootScope.$on("$routeChangeSuccess",function(){
        currentMessage = queue.shift() || null;
    });
    function setMessage(message, type){
        queue.push({message: message, type:type});
    }

    function getMessage(){
        return currentMessage;
    }
    return {
        setMessage : setMessage,
        getMessage : getMessage
    }

}
