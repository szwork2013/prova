/**
 * Created by Sysdata on 27/07/2015.
 */
/**
 * Created by Gianpiero on 17/07/2015.
 */
var express = require('express');
var fs = require('fs');

var routes = function(Album){

    var albumRouter = express.Router();

    albumRouter.route('/')
        .get(function(req,res){
            console.log("getting");
            Album.find(function(err,albums){
                if (!err) {
                    console.log(albums);
                    res.json(albums);
                } else {

                    res.status(500).send(err);
                }
            });
        })
        .post(function(req,res) {
            console.log("saving");
            var images = req.body.images;
            if (images) {
                images.forEach(function (el, index) {
                    var base64Data = el.data;
                    var url = 'C:/Users/Sysdata/WebstormProjects/RollingColorInMotionAPI/public/images/' + el.name;
                    console.log( url);
                    fs.writeFile(url, base64Data, 'base64', function (err) {

                    });
                    req.body.images[index].url = url;
                });
            }
            var album = new Album(req.body);
            console.log(album.name);
            album.save(function(err,album){
                if (!err) {
                    res.json(album);
                } else {
                    res.status(500).send(err);
                }
            });
        });
    return albumRouter;
}

module.exports = routes;