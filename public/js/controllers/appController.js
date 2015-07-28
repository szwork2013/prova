(function(){
    angular.module('app').controller('appController',['$scope','albumResource','eventResource','$rootScope','flash',AppController]);

    function AppController($scope,albumResource,eventResource,$rootScope,flash){

        init();
        $scope.getAlertClass = function(flash){
            if(flash){
                if(flash.type == "success")
                    return "alert-success";
                return "alert-danger";
            }
        }

        $scope.deleteAlbum = function(id)
        {
            var r = confirm("Sei sicuro di voler eliminare l'album ? ");
            if (r == true) {
                console.log("deleting: " + id);
                albumResource.delete({id : id},onSuccessDeleteAlbum,onErrorDeleteAlbum);
            }
        }

        $scope.deleteEvent = function(id)
        {
            var r = confirm("Sei sicuro di voler eliminare l'evento ?");
            if (r == true) {
                console.log("deleting: " + id);
                eventResource.delete({id : id},onSuccessDeleteEvent,onErrorDeleteEvent);
            }
        }

        function onSuccessDeleteAlbum(){
            flash.setMessage("Album eliminato","success");
            //fake change route for refresh flash message
            $rootScope.$broadcast('$routeChangeSuccess');
            init();
        }
        function onErrorDeleteAlbum(reason){
            console.log("delete album error");
            console.log(reason);
            flash.setMessage("Errore nell'eliminazione dell'album","error");
            $rootScope.$broadcast('$routeChangeSuccess');
        }

        function onSuccessDeleteEvent(){
            flash.setMessage("Evento eliminato","success");
            //fake change route for refresh flash message
            $rootScope.$broadcast('$routeChangeSuccess');
            init();
        }
        function onErrorDeleteEvent(reason){
            console.log("delete event error");
            console.log(reason);
            flash.setMessage("Errore nell'eliminazione dell'evento","error");
            $rootScope.$broadcast('$routeChangeSuccess');
        }

        function init(){
            $scope.flash = flash;
            $scope.albums = albumResource.query();
            $scope.events = eventResource.query();
        }


    }

})();
