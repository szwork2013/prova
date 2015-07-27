/**
 * Created by Sysdata on 27/07/2015.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path');

var app = express();
var config = require('./config/environment');
//var db = mongoose.connect('mongodb://gianpolo:Michela2010@ds059651.mongolab.com:59651/rcm_mongodb');
var db = require('./config/db');
mongoose.connect(db.url);

app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));


app.use('/',express.static(__dirname + '/public'));
app.use(express.static(__dirname +'/images/'));


var Album = require('./app/models/albumModel');
var Event = require('./app/models/eventModel');

var albumRouter = require('./app/routes/albumRouter')(Album);
var eventRouter = require('./app/routes/eventRouter')(Event);


app.use('/api/albums',albumRouter);
app.use('/api/events',eventRouter);


global.appRoot = path.resolve(__dirname);

app.listen(config.port, config.host, function () {
    console.log( "Listening on " + config.port + ", server_port " +config.port )

});
