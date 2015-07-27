/**
 * Created by Sysdata on 27/07/2015.
 */

(function(){
    var app = angular.module('app',['ngResource','flow','ngRoute']);

    app.config(function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl: "../views/home.html",
                controller: "appController"
            })
            .when('/addAlbum',{
                templateUrl:"../views/addAlbum.html",
                controller: "addAlbumController"
            })
            .when('/addEvent',{
                templateUrl : "../views/addEvent.html",
                controller: "addEventController"
            })
            .otherwise('/');
    });
})();
