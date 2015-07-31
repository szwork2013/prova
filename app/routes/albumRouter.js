var express = require('express'),
    config = require('./../../config/environment'),
    logger = require('./../../services/logger')(config),
    fs_service = require('../../services/fs_service')(logger);

var routes = function(Album){
    var albumRouter = express.Router();
    var imageRouter = express.Router({mergeParams: true});

    albumRouter.use('/:album_id',findAlbum);
    imageRouter.use('/:album_id/images',findAlbum);
    albumRouter.use('/:album_id/images',imageRouter);

    function findAlbum(req,res,next){
            Album.findById(req.params.album_id, function(err,album){
                if(err)
                    res.status(500).send(err);
                else if(album)
                {
                    req.album = album;
                    next();
                }
                else
                {
                    res.status(404).send('no book found');
                }
            });
    }
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
            if(!req.body.name)
                res.status(500).send("album name is required");

            logger.info("saving new album : " + req.body.name);

            var album = new Album(req.body);
            if(req.body._id){
                console.log("post contain id for album... delete it");
                delete req.body._id;
            }
            album.save(function(){
                album.save(function(err,album){
                    if (!err) {
                        res.json(album);
                    } else {
                        res.status(500).send(err);
                    }
                });
            })

            //var album = new Album(req.body);
            //var base_url = 'images_uploaded/' +album._id + '/';
            //
            //var images = req.body.images;

            //if (images) {
            //    var fileToSave = images.length;
            //    logger.info("saving album with: "+fileToSave+" images");
            //
            //    var fileSaved = 0;
            //
            //
            //    images.forEach(function (el, index) {
            //        var base64Data = el.data;
            //        var saveLocation = config.images_dir + base_url;
            //        var filename = el.name;
            //        fs_service.saveImage(base64Data, saveLocation, filename,onSuccessWrite,onErrorWrite);
            //
            //        function onSuccessWrite(){
            //            fileSaved++;
            //            album.images[index].url = base_url + el.name;
            //            logger.info("OnSuccessWrite: " + fileSaved + " / "+fileToSave);
            //            if(fileSaved == fileToSave)
            //            {
            //                saveAlbum();
            //            }
            //        }
            //        function onErrorWrite(err){
            //            logger.debug("onErrorWrite: " +err);
            //            res.status(500).send("album not saved");
            //        }
            //    });
            //}
            //else{
            //    logger.info("saving album without images");
            //    saveAlbum();
            //}

            //function saveAlbum(){
            //    logger.debug("saving album into mongodb")
            //    album.save(function(err,album){
            //        if (!err) {
            //            res.json(album);
            //        } else {
            //            res.status(500).send(err);
            //        }
            //    });
            //}
        });

    albumRouter.route('/:album_id')
        .get(function(req,res){
            logger.info("getting album: " + req.album.album_id);
            var returnAlbum = req.album.toJSON();
            res.json(returnAlbum);
        })
        .put(function(req,res){
            logger.info("updating : "+req.album.album_id);
            req.album.name = req.body.name;

            if(req.body.images && req.body.images != undefined)
            {
                var album_dir = "images_uploaded/"+ req.album._id + "/";
                var baseUrl = config.images_dir + album_dir;

                for(var i = 0; i< req.body.images.length; i++){
                    if(req.body.images[i]._id != undefined || req.body.images[i]._id != null)
                        continue;

                    var base64data = req.body.images[i].data;
                    var filename = req.body.images[i].name;

                    fs_service.saveImage(base64data,baseUrl,filename, onSuccessWrite,onErrorWrite);

                    function onSuccessWrite(){
                            req.album.images.push({url : album_dir + filename});
                    }

                    function onErrorWrite(err){
                        console.log(err);
                    }
                }

                req.album.save(function(err,album){
                    if(err){
                        res.status(500).send();
                    }
                    else{
                        console.log("update success");
                        res.json(album);
                    }
                })
            }


            req.album.images = req.body.images;

        })
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

    imageRouter.route('/')
        .post(function(req,res){
            console.log("you are posting an image into album : " + req.album.name);
            var fileToSave = images.length;
            logger.info("saving album with: "+fileToSave+" images");

            var base_url =  'images_uploaded/'+req.album._id+'/';

                var base64Data = req.body.data;
                var saveLocation = config.images_dir + base_url;
                var filename = req.body.name;
                fs_service.saveImage(base64Data, saveLocation, filename,onSuccessWrite,onErrorWrite);

                function onSuccessWrite(){
                    album.images.push({url :base_url + filename});
                    req.album.save(function(err,album){
                        if(err){
                            res.status(500).send("album not saved");
                        }
                        else{
                            res.json(req.album.images[req.album.images.length-1]);
                        }
                    })
                }
                function onErrorWrite(err){
                    logger.debug("onErrorWrite: " +err);
                    res.status(500).send("album not saved");
                }
            });


    return albumRouter;
}

module.exports = routes;