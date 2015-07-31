/**
 * Created by Gianpiero on 28/07/2015.
 */

var fs = require('fs');


var fs_service = function(logger){
    return {
        saveImage: function (base64Data, path, filename, onSuccessWrite, onErrorWrite) {
            var file = path + '/' + filename;
            logger.info("fs_service save image: " + filename + " in path: " + path);

            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
                logger.debug('fs_service directory: ' + path + ' created');
            }

            fs.writeFile(file, base64Data, 'base64', function (err) {
                logger.info("writeFile");
                if (err) {
                    logger.info("fs_service error when saving: " + file + "\nerror: " + err);
                    onErrorWrite(err);
                } else {
                    logger.info("fs_service file :" + file + " saved");
                    onSuccessWrite();
                }
            });
        },
        deleteAlbum: function (path) {
            logger.info("fs_service delete album: "+path);
            fs.readdir(path, function (err, files) {
                if (err) {
                    return;
                }
                var wait = files.length,
                    count = 0,
                    folderDone = function (err) {
                        count++;
                        // If we cleaned out all the files, continue
                        if (count >= wait || err) {
                            fs.rmdir(path);
                        }
                    };
                // Empty directory to bail early
                if (!wait) {
                    folderDone();
                    return;
                }

                // Remove one or more trailing slash to keep from doubling up
                path = path.replace(/\/+$/, "");
                files.forEach(function (file) {
                    var curPath = path + "/" + file;
                    fs.lstat(curPath, function (err, stats) {
                        if (err) {
                            return;
                        }
                        if (stats.isDirectory()) {
                            rmdirAsync(curPath, folderDone);
                        } else {
                            fs.unlink(curPath, folderDone);
                        }
                    });
                });

            })
        }
    }
}
module.exports = fs_service;


