/**
 * Created by Sysdata on 27/07/2015.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    config = require('./config/environment'),
    logger = require('./services/logger')(config),
    fs_service = require('./services/fs_service')(logger);

var app = express();
var db = require('./config/db');
mongoose.connect(db.url);

app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));


app.use('/',express.static(__dirname + '/public'));
app.use('/images_uploaded/',express.static(__dirname +'/images_uploaded/'));


var Album = require('./app/models/albumModel');
var Event = require('./app/models/eventModel');

var albumRouter = require('./app/routes/albumRouter')(Album,fs_service,logger);
var eventRouter = require('./app/routes/eventRouter')(Event);


app.use('/api/albums',albumRouter);
app.use('/api/events',eventRouter);


app.listen(config.port, config.host, function () {
    logger.info( "Listening on " + config.port + ", server_port " +config.port );

});
