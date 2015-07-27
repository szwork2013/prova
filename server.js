/**
 * Created by Sysdata on 27/07/2015.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var app = express();

//var db = mongoose.connect('mongodb://gianpolo:Michela2010@ds059651.mongolab.com:59651/rcm_mongodb');
var db = require('./config/db');
mongoose.connect(db.url);

app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));


app.use('/',express.static(__dirname + '/public'));

var Album = require('./app/models/albumModel');
var Event = require('./app/models/eventModel');

var albumRouter = require('./app/routes/albumRouter')(Album);
var eventRouter = require('./app/routes/eventRouter')(Event);


app.use('/api/albums',albumRouter);
app.use('/api/events',eventRouter);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});
