/**
 * Created by Sysdata on 27/07/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var imageModel = new Schema({
    url: {type: String}
});
var albumModel = new Schema({
    name: {type:String},
    images: [imageModel]
});

module.exports = mongoose.model("Album",albumModel);