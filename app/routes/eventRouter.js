var express = require('express');

var eventRouter =  express.Router();

var routes = function(Event){

    eventRouter.route('/')
        .get(function(req,res){
            console.log("getting all events");
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

    eventRouter.route('/:event_id')
        .get(function(req,res){
            console.log("getting event: " + req.params.event_id);
            Event.findById(req.params.event_id,function(err,event){
                if (!err) {
                    res.json(event);
                } else {
                    res.status(500).send(err);
                }
            })
        })
        .delete(function(req,res){
            console.log("deleting event: " + req.params.event_id);
            Event.remove(req.params.event_id,function(err){
                if(err)
                    res.status(500).json({message: reason});
                else
                    res.status(204).send();
            });
        });

    return eventRouter;
};

module.exports = routes;
