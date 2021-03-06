const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classData = new Schema({
    className: String,
    classNumber: Number,
    cardType: String,
    info: String,
    dateTaken: String,
    tags: [String]
});

module.exports = classData;