/**
 * Created by Sysdata on 27/07/2015.
 */

var config = {};

config.host = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
config.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
config.images_dir = process.env.OPENSHIFT_DATA_DIR || './';
module.exports = config;
