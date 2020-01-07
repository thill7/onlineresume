const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var language = new Schema({
    language: String,
    selfTaught: Boolean,
    schoolTaught: Boolean,
    info: String
});

module.exports = language;