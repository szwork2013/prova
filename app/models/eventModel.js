/**
 * Created by Sysdata on 27/07/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventModel = new Schema({
    name: {type: String},
    start_date: {type: Date},
    end_date: {type:Date},
    location: {type:String},
    description: {type:String}
});

module.exports = mongoose.model("Event",eventModel);