/**
 * Created by Sysdata on 27/07/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var albumModel = new Schema({
    name: {type:String},
    images: [
        {url : {type:String}}
    ]


});

module.exports = mongoose.model("Album",albumModel);