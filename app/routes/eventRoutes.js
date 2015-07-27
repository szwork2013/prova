/**
 * Created by Sysdata on 27/07/2015.
 */
/**
 * Created by Sysdata on 22/07/2015.
 */
var express = require('express'),
    bodyParser = require('body-parser');

var eventRouter =  express.Router();

var routes = function(Event){

    eventRouter.route('/')
        .get(function(req,res){

            Event.find(function(err,events){
                if(err)
                {
                    res.status(500).send(err);
                }
                else
                {
                    res.json(events);
                }
            });
        })
        .post(function(req,res){
            console.log("saving event");
            var newEvent = new Event(req.body);
            newEvent.save(newEvent,function(err,event){
                if(err){
                    console.log('cant save new event');
                    res.status(500).send(err);
                }
                else{
                    console.log('new event saved');
                    res.json(event);
                }
            });


        });

    return eventRouter;
};

module.exports = routes;
