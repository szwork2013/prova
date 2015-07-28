/**
 * Created by Sysdata on 27/07/2015.
 */
/**
 * Created by Gianpiero on 17/07/2015.
 */
var express = require('express'),
    fs = require('fs'),
    config = require('./../../config/environment'),
    fs_service = require('../services/fs_service');

var routes = function(Album){


    var albumRouter = express.Router();

    albumRouter.route('/')
        .get(function(req,res){
            console.log("getting all albums");
            Album.find(function(err,albums){
                if (!err) {
                    res.json(albums);
                } else {
                    res.status(500).send(err);
                }
            });
        })
        .post(function(req,res) {

            console.log("saving one album");
            var album = new Album(req.body);
            var dir = 'images_uploaded/' +album._id;

            var images = req.body.images;

            if (images) {

                var fileToSave = images.length;
                var fileSaved = 0;
                var writeFailed = false;

                images.forEach(function (el, index) {
                    var base64Data = el.data;
                    var path = config.images_dir + dir;
                    var filename = el.name;
                    album.images[index].url = dir + '/' +el.name;

                    fs_service.saveImage(base64Data, path, filename,onSuccessWrite,onErrorWrite);

                    function onSuccessWrite(){
                        fileSaved++;
                        console.log("OnSuccessWrite: " + fileSaved + " / "+fileToSave);

                        if(fileSaved == fileToSave)
                        {
                            console.log("saving album into mongodb")
                            album.save(function(err,album){
                                if (!err) {
                                    res.json(album);
                                } else {
                                    res.status(500).send(err);
                                }
                            });
                        }
                    }

                    function onErrorWrite(){
                        console.log("callback funcition onErrorWrite");
                        writeFailed = true;
                        res.status(500).send("album not saved");
                    }

                });


            }

        });

        albumRouter.route('/:album_id')
            .get(function(req,res){
                console.log("getting album: " + req.params.album_id);
                Album.findById(req.params.album_id,function(err,album){
                    if (!err) {
                        res.json(album);
                    } else {
                        res.status(500).send(err);
                    }
                })
            })
            .delete(function(req,res){
                var album_id = req.params.album_id;
                console.log("deleting album: " + album_id);

                Album.findById(album_id,function(err,album){
                    if(err)
                        res.status(500).send("album not found");
                    else {
                        var path= config.images_dir  + 'images_uploaded/' +album_id;
                        album.remove();

                        fs_service.deleteAlbum(path);
                        res.status(204).send();
                    }
                })
            });

    return albumRouter;
}

module.exports = routes;