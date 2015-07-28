/**
 * Created by Sysdata on 27/07/2015.
 */
/**
 * Created by Gianpiero on 17/07/2015.
 */
var express = require('express'),
    fs = require('fs'),
    config = require('./../../config/environment')

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

            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
                console.log('directory created');
            }

            var images = req.body.images;

            if (images) {
                var writeImagesError = false;

                images.forEach(function (el, index) {

                    var base64Data = el.data;
                    album.images[index].url = dir + '/' +el.name;
                    var fs_dir_path = config.images_dir + dir + '/'+el.name;

                    fs.writeFile(fs_dir_path, base64Data, 'base64', function (err) {
                        if(err){
                            console.log("errore nel salvataggio del file");
                            writeImagesError = err;
                        }
                    });
                });
            }
            if(!writeImagesError)
            {
                album.save(function(err,album){
                    if (!err) {
                        res.json(album);
                    } else {
                        res.status(500).send(err);
                    }
                });
            }
            else{
                res.status(500).send(writeImagesError);
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
                console.log("deleting album: " + req.params.album_id);
                Album.remove(req.params.album_id,function(err){
                    if(err)
                        res.status(500).json({message: reason});
                    else
                        res.status(204).send();
                });

            });
    return albumRouter;
}

module.exports = routes;