/**
 * Created by Sysdata on 27/07/2015.
 */

var express = require('express');

var app = express();


app.use('/',express.static(__dirname + '/public'));

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});

