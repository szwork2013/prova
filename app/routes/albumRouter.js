var express = require('express'),
    config = require('./../../config/environment'),
    logger = require('./../../services/logger')(config),
    fs_service = require('../../services/fs_service')(logger);

var routes = function(Album){
    var albumRouter = express.Router();

    albumRouter.route('/')
        .get(function(req,res){
            logger.info("getting all albums");
            Album.find(function(err,albums){
                if (!err) {
                    res.json(albums);
                } else {
                    res.status(500).send(err);
                }
            });
        })
        .post(function(req,res) {
            logger.info("saving one album");
            var album = new Album(req.body);
            var dir = 'images_uploaded/' +album._id;

            var images = req.body.images;

            if (images) {
                var fileToSave = images.length;
                logger.info("saving album with: "+fileToSave+" images");

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
                        logger.info("OnSuccessWrite: " + fileSaved + " / "+fileToSave);

                        if(fileSaved == fileToSave)
                        {
                            saveAlbum();
                        }
                    }
                    function onErrorWrite(err){
                        logger.debug("onErrorWrite: " +err);
                        writeFailed = true;
                        res.status(500).send("album not saved");
                    }
                });
            }
            else{
                logger.info("saving album without images");
                saveAlbum();
            }

            function saveAlbum(){
                logger.debug("saving album into mongodb")
                album.save(function(err,album){
                    if (!err) {
                        res.json(album);
                    } else {
                        res.status(500).send(err);
                    }
                });
            }
        });

        albumRouter.route('/:album_id')
            .get(function(req,res){
                logger.info("getting album: " + req.params.album_id);
                Album.findById(req.params.album_id,function(err,album){
                    if (!err) {
                        res.json(album);
                    } else {
                        res.status(500).send(err);
                    }
                })
            })
            //.put(function(req,res){
            //    logger.info("updating : "+req.params.album_id);
            //    Album.findById(req.params.album_id,function(err,album){
            //        console.log(album);
            //    })
            //
            //})
            .delete(function(req,res){
                var album_id = req.params.album_id;

                logger.info("deleting album: " + album_id);
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