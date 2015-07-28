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
            var images = req.body.images;
            if (images) {
                images.forEach(function (el, index) {

                    var base64Data = el.data;
                    var album = new Album(req.body);
                    var dir = '/images/' +album._id;


                    if (!fs.existsSync(dir)){
                        fs.mkdirSync(dir);
                        console.log('directory created');
                    }

                    req.body.images[index].url = dir + '/' +el.name;
                    var url = config.images_dir + dir + '/'+el.name;

                    fs.writeFile(url, base64Data, 'base64', function (err) {

                        if(err){
                            console.log(err);
                        }
                        else{
                            //store path into mongodb
                            album.save(function(err,album){
                                if (!err) {
                                    res.json(album);
                                } else {
                                    res.status(500).send(err);
                                }
                            });
                        }
                    });

                });


            }

        });

        albumRouter.route('/:album_id')
            .get(function(req,res){
                console.log("getting " + req.params.album_id);
                Album.findById(req.params.album_id,function(err,album){
                    if (!err) {
                        res.json(album);
                    } else {
                        res.status(500).send(err);
                    }
                })
            })
    return albumRouter;
}

module.exports = routes;